using IgniteList.Business.Services;
using IgniteList.Business.Entities;
using IgniteList.Business.DTO;
using IgniteList.Business.Enums;
using IgniteList.Business.DataMappers;
using IgniteList.Business.ValidationRules;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Excel;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Extensions;
using Spiderly.Shared.Helpers;
using Spiderly.Security.DTO;
using Spiderly.Security.Services;
using Spiderly.Shared.Exceptions;
using Microsoft.EntityFrameworkCore;
using Mapster;
using FluentValidation;
using Spiderly.Shared.Emailing;
using Azure.Storage.Blobs;
using Spiderly.Shared.Attributes.Entity;

namespace IgniteList.Business.Services
{
    public class IgniteListBusinessService : IgniteList.Business.Services.BusinessServiceGenerated
    {
        private readonly IApplicationDbContext _context;
        private readonly IgniteList.Business.Services.AuthorizationBusinessService _authorizationService;
        private readonly AuthenticationService _authenticationService;
        private readonly SecurityBusinessService<User> _securityBusinessService;
        private readonly EmailingService _emailingService;

        public IgniteListBusinessService(
            IApplicationDbContext context,
            ExcelService excelService,
            IgniteList.Business.Services.AuthorizationBusinessService authorizationService,
            SecurityBusinessService<User> securityBusinessService,
            AuthenticationService authenticationService,
            EmailingService emailingService,
            IFileManager fileManager
        )
            : base(context, excelService, authorizationService, fileManager)
        {
            _context = context;
            _authorizationService = authorizationService;
            _securityBusinessService = securityBusinessService;
            _authenticationService = authenticationService;
            _emailingService = emailingService;
        }

        #region User

        /// <summary>
        /// IsDisabled is handled inside authorization service
        /// </summary>
        protected override async Task OnBeforeSaveUserAndReturnSaveBodyDTO(UserSaveBodyDTO userSaveBodyDTO)
        {
            await _context.WithTransactionAsync(async () =>
            {
                if (userSaveBodyDTO.UserDTO.Id <= 0)
                    throw new HackerException("You can't add new user.");

                User user = await GetInstanceAsync<User, long>(userSaveBodyDTO.UserDTO.Id, userSaveBodyDTO.UserDTO.Version);

                if (userSaveBodyDTO.UserDTO.Email != user.Email ||
                    userSaveBodyDTO.UserDTO.HasLoggedInWithExternalProvider != user.HasLoggedInWithExternalProvider
                //userSaveBodyDTO.UserDTO.AccessedTheSystem != user.AccessedTheSystem
                )
                {
                    throw new HackerException("You can't change Email, HasLoggedInWithExternalProvider nor AccessedTheSystem from the main UI form.");
                }
            });
        }

        #endregion

        #region Notification

        public async Task SendNotificationEmail(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                await _authorizationService.AuthorizeAndThrowAsync<User>(BusinessPermissionCodes.UpdateNotification);

                // Checking version because if the user didn't save and some other user changed the version, he will send emails to wrong users
                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                List<string> recipients = notification.Recipients.Select(x => x.Email).ToList();

                await _emailingService.SendEmailAsync(recipients, notification.Title, notification.EmailBody);
            });
        }

        /// <summary>
        /// Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task DeleteNotificationForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteDeleteAsync();
            });
        }

        /// <summary>
        /// Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsReadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, true));
            });
        }

        /// <summary>
        /// Don't need authorization because user can do whatever he wants with his notifications
        /// </summary>
        public async Task MarkNotificationAsUnreadForCurrentUser(long notificationId, int notificationVersion)
        {
            await _context.WithTransactionAsync(async () =>
            {
                long currentUserId = _authenticationService.GetCurrentUserId();

                Notification notification = await GetInstanceAsync<Notification, long>(notificationId, notificationVersion);

                await _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.Notification.Id == notification.Id)
                    .ExecuteUpdateAsync(setters => setters.SetProperty(x => x.IsMarkedAsRead, false));
            });
        }

        public async Task<int> GetUnreadNotificationsCountForCurrentUser()
        {
            long currentUserId = _authenticationService.GetCurrentUserId();

            return await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId && x.IsMarkedAsRead == false);

                int count = await notificationUsersQuery.CountAsync();

                return count;
            });
        }

        public async Task<PaginatedResultDTO<NotificationDTO>> GetNotificationsForCurrentUser(FilterDTO tableFilterDTO)
        {
            PaginatedResultDTO<NotificationDTO> result = new();
            long currentUserId = _authenticationService.GetCurrentUserId(); // Not doing user.Notifications, because he could have a lot of them.

            await _context.WithTransactionAsync(async () =>
            {
                var notificationUsersQuery = _context.DbSet<UserNotification>()
                    .Where(x => x.User.Id == currentUserId)
                    .Select(x => new
                    {
                        UserId = x.User.Id,
                        NotificationId = x.Notification.Id,
                        IsMarkedAsRead = x.IsMarkedAsRead,
                    });

                int count = await notificationUsersQuery.CountAsync();

                var notificationUsers = await notificationUsersQuery
                    .Skip(tableFilterDTO.First)
                    .Take(tableFilterDTO.Rows)
                    .ToListAsync();

                List<NotificationDTO> notificationsDTO = new();

                foreach (var item in notificationUsers)
                {
                    NotificationDTO notificationDTO = new();

                    Notification notification = await GetInstanceAsync<Notification, long>(item.NotificationId, null);
                    notificationDTO.Id = notification.Id;
                    notificationDTO.Version = notification.Version;
                    notificationDTO.Title = notification.Title;
                    notificationDTO.Description = notification.Description;
                    notificationDTO.CreatedAt = notification.CreatedAt;

                    notificationDTO.IsMarkedAsRead = item.IsMarkedAsRead;

                    notificationsDTO.Add(notificationDTO);
                }

                notificationsDTO = notificationsDTO.OrderByDescending(x => x.CreatedAt).ToList();

                result.Data = notificationsDTO;
                result.TotalRecords = count;
            });

            return result;
        }

        #endregion

        #region Project

        public override async Task<PaginatedResultDTO<ProjectDTO>> GetPaginatedProjectList(FilterDTO filterDTO, IQueryable<Project> query, bool authorize)
        {
            return await _context.WithTransactionAsync(async () =>
            {
                PaginatedResultDTO<ProjectDTO> projectTableData = await base.GetPaginatedProjectList(filterDTO, query, authorize);
                long currentUserId = _authenticationService.GetCurrentUserId();
                foreach (ProjectDTO projectDTO in projectTableData.Data)
                {
                    projectDTO.HasUpvoted = await _context.DbSet<Project>()
                        .AnyAsync(x =>
                            x.Id == projectDTO.Id &&
                            x.UpvotedUsers.Any(x => x.Id == currentUserId)
                        );
                }
                return projectTableData;
            });
        }

        public async Task Upvote(long projectId)
        {
            await _context.WithTransactionAsync(async () =>
            {
                User user = await _authenticationService.GetCurrentUser<User>();
                Project project = await GetInstanceAsync<Project, long>(projectId, null);

                Upvote existingUpvote = await _context.DbSet<Upvote>()
                    .FirstOrDefaultAsync(u => u.Project.Id == projectId && u.User.Id == user.Id);

                if (existingUpvote == null)
                {
                    Upvote upvote = new Upvote
                    {
                        Project = project,
                        User = user
                    };
                    await _context.DbSet<Upvote>().AddAsync(upvote);

                    project.UpvoteCount++;
                }
                else
                {
                    _context.DbSet<Upvote>().Remove(existingUpvote);

                    project.UpvoteCount--;
                }

                await _context.SaveChangesAsync();
            });
        }

        protected override Task OnBeforeSaveProjectAndReturnSaveBodyDTO(ProjectSaveBodyDTO saveBodyDTO)
        {
            saveBodyDTO.ProjectDTO.UserId = _authenticationService.GetCurrentUserId();

            return base.OnBeforeSaveProjectAndReturnSaveBodyDTO(saveBodyDTO);
        }

        #endregion

    }
}
