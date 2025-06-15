using IgniteList.Business.Services;
using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.Interfaces;

namespace IgniteList.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class ProjectController : ProjectBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly IgniteListBusinessService _igniteListBusinessService;

        public ProjectController(
            IApplicationDbContext context,
            IgniteListBusinessService igniteListBusinessService
        )
            : base(context, igniteListBusinessService)
        {
            _context = context;
            _igniteListBusinessService = igniteListBusinessService;
        }
        [AuthGuard]
        [HttpGet]
        public async Task Upvote(long projectId)
        {
            await this._igniteListBusinessService.Upvote(projectId);
        }
    }
}
