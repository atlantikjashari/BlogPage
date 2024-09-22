using BlogPage.Models.DTOs;
using BlogPage.Models;
using BlogPage.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BlogPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _jwtConfig;
        public AuthenticationController(UserManager<User> userManager, SignInManager<User> signInManager, TokenService jwtConfig)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtConfig = jwtConfig;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto requestDto)
        {
            if (ModelState.IsValid)
            {
                var user_exist = await _userManager.FindByEmailAsync(requestDto.Email);
                if (user_exist != null)
                {
                    ModelState.AddModelError("email", "Email taken!");
                    return ValidationProblem();
                }
                var newUser = new User()
                {
                    FirstName = requestDto.FirstName,
                    UserName = requestDto.UserName,
                    Email = requestDto.Email
                };

                var isCreated = await _userManager.CreateAsync(newUser, requestDto.Password);

                if (isCreated.Succeeded)
                {
                    var token = await _jwtConfig.GenerateJwtToken(newUser);

                    await _userManager.AddToRoleAsync(newUser, "User");

                    return Ok(new AuthResult()
                    {
                        FirstName = newUser.FirstName,
                        UserName = newUser.UserName,
                        Roli = await _userManager.GetRolesAsync(newUser),
                        Result = true,
                        Token = token
                    });
                }
                return BadRequest("Problem registering user!");
            }

            return BadRequest();
        }


        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto loginRequestDto)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(loginRequestDto.Email);

                if (existingUser == null)
                {
                    ModelState.AddModelError("email", "Invalid Email!");
                    return ValidationProblem();
                }
                var isCorrect = await _signInManager.PasswordSignInAsync(existingUser, loginRequestDto.Password, false, false);

                if (!isCorrect.Succeeded)
                {
                    ModelState.AddModelError("password", "Invalid Password!");
                    return ValidationProblem();
                }

                var jwtToken = await _jwtConfig.GenerateJwtToken(existingUser);

                return Ok(new AuthResult()
                {
                    FirstName = existingUser.FirstName,
                    UserName = existingUser.UserName,
                    Roli = await _userManager.GetRolesAsync(existingUser),
                    Token = jwtToken,
                    Result = true
                });
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> CurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            if (user == null)
            {
                return NotFound();
            }

            var jwtToken = await _jwtConfig.GenerateJwtToken(user);
            var rolet = await _userManager.GetRolesAsync(user);

            return Ok(new AuthResult()
            {
                Result = true,
                FirstName = user.FirstName,
                UserName = user.UserName,
                Email = user.Email,
                Token = jwtToken,
                Roli = rolet
            });
        }
    }
}
