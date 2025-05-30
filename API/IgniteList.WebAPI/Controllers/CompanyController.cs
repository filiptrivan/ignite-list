using IgniteList.Business.Services;
using Microsoft.AspNetCore.Mvc;
using Spiderly.Shared.Interfaces;

namespace IgniteList.WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]/[action]")]
    public class CompanyController : CompanyBaseController
    {
        private readonly IApplicationDbContext _context;
        private readonly IgniteListBusinessService _igniteListBusinessService;

        public CompanyController(
            IApplicationDbContext context,
            IgniteListBusinessService igniteListBusinessService
        )
            : base(context, igniteListBusinessService)
        {
            _context = context;
            _igniteListBusinessService = igniteListBusinessService;
        }
    }
}
