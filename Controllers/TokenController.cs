using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ag2.Models;
using Jose;
using Microsoft.AspNetCore.Mvc;

namespace ag2.Controllers
{
    [Produces("application/json")]
    [Route("api/token")]
    public class TokenController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody] Login loginData)
        {
            // TODO: key應該移至config
            var secret = "jtwDemo";

            // TODO: 真實世界檢查帳號密碼
            if (loginData.Username == "user" && loginData.Password == "1234")
            {
                var payload = new JwtAuthObject(){
                    Id = "user"
                };

                return Ok(new
                {
                    Result = true,
                    token = Jose.JWT.Encode(payload, Encoding.UTF8.GetBytes(secret), JwsAlgorithm.HS256)
                });
            }
            else
            {
                throw new UnauthorizedAccessException("帳號密碼錯誤");
            }
        }

    }
}