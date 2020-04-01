using Microsoft.AspNetCore.Mvc;
using AuthServer.Models;
using System.Threading.Tasks;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using IdentityMicroservice.Models;
using Microsoft.AspNetCore.Authorization;

namespace IdentityMicroservice.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IAuthenticationSchemeProvider _schemeProvider;
        private readonly IClientStore _clientStore;
        private readonly IEventService _events;

        public RegisterController(SignInManager<ApplicationUser> signInManager, 
            UserManager<ApplicationUser> userManager, 
            IIdentityServerInteractionService interaction, 
            IAuthenticationSchemeProvider schemeProvider, 
            IClientStore clientStore, 
            IEventService events)
        {
            _userManager = userManager;
            _interaction = interaction;
            _schemeProvider = schemeProvider;
            _clientStore = clientStore;
            _events = events;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterRequestViewModel model)
        {
            //var aVal = 0; var blowUp = 1 / aVal;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);
            try
            {
                await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("userName", user.UserName));
                await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("email", user.Email));
                await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("role", "consumer"));
            }
            catch (System.Exception ex)
            {
                throw;
            }

            return Ok(new RegisterResponseViewModel(user));
        }
    }
}
