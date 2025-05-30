using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Interfaces;
using Azure.Storage.Blobs;
using Spiderly.Shared.DTO;
using Spiderly.Shared.Resources;
using Spiderly.Security.Services;
using IgniteList.Business.Services;
using IgniteList.Business.DTO;
using IgniteList.Business.Entities;

namespace IgniteList.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class UserExtendedController : UserExtendedBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly IgniteListBusinessService _igniteListBusinessService;
        private readonly AuthenticationService _authenticationService;

        public UserExtendedController(
            IApplicationDbContext context, 
            IgniteListBusinessService igniteListBusinessService, 
            AuthenticationService authenticationService
        )
            : base(context, igniteListBusinessService)
        {
            _context = context;
            _igniteListBusinessService = igniteListBusinessService;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [AuthGuard]
        [SkipSpinner]
        public async Task<UserExtendedDTO> GetCurrentUserExtended()
        {
            long userId = _authenticationService.GetCurrentUserId();
            return await _igniteListBusinessService.GetUserExtendedDTO(userId, false); // Don't need to authorize because he is current user
        }

    }
}

