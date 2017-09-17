using System;
//using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using ag2.Models;

namespace ag2.Controllers
{

    [Route("api/[controller]")]
    public class TokenAuthController : Controller
    {

       
        [HttpPut("Login")]
        public IActionResult Login([FromBody]Login login)
        {
            bool existUser = (login.Username=="user" && login.Password =="pwd");

            if (existUser)
            {
                var requestAt = DateTime.Now;
                var expiresIn = requestAt + TokenAuthOption.ExpiresSpan;
                var token = GenerateToken(login, expiresIn);

                return Ok(
                    new
                    {
                        requertAt = requestAt,
                        expiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
                        tokeyType = TokenAuthOption.TokenType,
                        accessToken = token
                    }
                );
            }
            else
            {
                //return Unauthorized();
                return StatusCode(401, new{
                    Msg = "Username or password is invalid"
                });
            }
        }

        private string GenerateToken(Login login, DateTime expires)
        {
            var handler = new JwtSecurityTokenHandler();

            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(login.Username, "TokenAuth"),
                new[] { new Claim("Username", login.Username.ToString())}
            );

            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = TokenAuthOption.Issuer,
                Audience = TokenAuthOption.Audience,
                SigningCredentials = TokenAuthOption.SigningCredentials,
                Subject = identity,
                Expires = expires
            });
            return handler.WriteToken(securityToken);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public IActionResult GetUserInfo()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            
            
            return Ok(new
            {
                UserName = claimsIdentity.Name
            });

        }
    }
}
