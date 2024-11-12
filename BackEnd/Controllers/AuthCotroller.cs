using BackEnd.helpers;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        private readonly IUserService _userService;
        public AuthController(IIdentityService identityService, IUserService userService)
        {
            _identityService = identityService;
            _userService = userService;
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Register([FromBody] RegisterModel registerModel)
        {
            var result = _identityService.Register(registerModel);
            if (result.IsSuccess)
            {
                return Created($"/api/User/{result.Data.Id}", result.Data);
            }
            return BadRequest(result);
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel loginModel)
        {
            var result = await _identityService.LoginAsync(loginModel);
            if (result.IsSuccess)
            {
                return Ok(result.Data);
            }
            return BadRequest(result);
        }
        [Route("refresh")]
        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] TokenModel request)
        {
            var result = await _identityService.RefreshTokenAsync(request);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            else {
                return BadRequest(result);
            }
            
        }

        [Route("getCurrentUser")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCurrentUser()
        {

            int UserId = GetUserIdFromToken();
            var result = _userService.Get(UserId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        protected int GetUserIdFromToken()
        {
            int UserId = 0;
            try
            {
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var identity = HttpContext.User.Identity as ClaimsIdentity;
                    if (identity != null)
                    {
                        IEnumerable<Claim> claims = identity.Claims;
                        string strUserId = identity.FindFirst("UserId").Value;
                        int.TryParse(strUserId, out UserId);
                    }
                }
                return UserId;
            }
            catch
            {
                return UserId;
            }
        }
    }
}
