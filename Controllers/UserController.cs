using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ag2.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace ag2.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        private readonly TestContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UserController(TestContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        // GET: api/User
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        [HttpGet("webroot")]
        public String GetWebRoot(){
            //return _hostingEnvironment.ContentRootPath;
            return _hostingEnvironment.WebRootPath;
        }

        [HttpGet("content")]
        public String GetContent(){
            return _hostingEnvironment.ContentRootPath;            
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("ufile")]
        public string Upload(IFormFile file)
        {
            if (file != null)
            {
                var folder = _hostingEnvironment.WebRootPath + "/wwwroot/dist/img";
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var filePath = Path.Combine(folder, file.FileName);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                using (var fileStream = new FileStream(filePath, FileMode.Create)) {
                    //await file.CopyToAsync(fileStream);
                    file.CopyTo(fileStream);
                }

                return file.FileName;            
            }
            return "";
        }         

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> PostUser([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}