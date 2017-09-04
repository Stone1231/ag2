using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ag2.Models;

namespace ag2.Controllers
{
    [Produces("application/json")]
    [Route("api/file")]
    public class FileController : Controller{

        [HttpGet("user")]
        public IActionResult UserFile()
        {
            return NotFound();
        }

        [HttpPost("upload")]
        public IActionResult Upload(List<IFormFile> files)
        {
            foreach (var file in files)
            {
                // to do save
            }

            return Ok();
        } 

        [HttpPut("upload2")]
        public IActionResult Upload2(IFormFile file)
        {
           var _file = file; 

            return Ok();
        } 
    }
}

