using Microsoft.AspNetCore.Mvc;
using Spiderly.Security.Interfaces;
using Spiderly.Security.Services;
using Spiderly.Security.SecurityControllers;
using Spiderly.Shared.Interfaces;
using Spiderly.Shared.Attributes;
using Spiderly.Shared.DTO;
using Microsoft.EntityFrameworkCore;
using Spiderly.Shared.Resources;
using Spiderly.Security.DTO;
using Spiderly.Shared.Extensions;
using IgniteList.Business.Entities;
using IgniteList.Business.Services;
using IgniteList.Business.DTO;

namespace IgniteList.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class SecurityController : SecurityBaseController<User>
    {
        private readonly ILogger<SecurityController> _logger;
        private readonly SecurityBusinessService<User> _securityBusinessService;
        private readonly IApplicationDbContext _context;
        private readonly IgniteListBusinessService _igniteListBusinessService;


        public SecurityController(
            ILogger<SecurityController> logger, 
            SecurityBusinessService<User> securityBusinessService, 
            IJwtAuthManager jwtAuthManagerService, 
            IApplicationDbContext context, 
            AuthenticationService authenticationService,
            AuthorizationService authorizationService,
            IgniteListBusinessService igniteListBusinessService
        )
            : base(securityBusinessService, jwtAuthManagerService, context, authenticationService, authorizationService)
        {
            _logger = logger;
            _securityBusinessService = securityBusinessService;
            _context = context;
            _igniteListBusinessService = igniteListBusinessService;
        }

       

    }
}

