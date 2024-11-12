using System;
using BackEnd.Data;
using BackEnd.helpers;
using BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using BackEnd.helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.Win32;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RevDbContext _context;
        public UserController(RevDbContext context)
        {
            _context = context;
        }
        protected User? getCurrentUser()
        {
            if (HttpContext != null && HttpContext.User != null && HttpContext.User.Identity != null && HttpContext.User.Identity.IsAuthenticated)
            {
                var identity = HttpContext.User.Identity as ClaimsIdentity;
                if (identity != null)
                {
                    IEnumerable<Claim> claims = identity.Claims;
                    string strUserId = identity.FindFirst("UserId").Value;
                    int userId = int.Parse(strUserId);
                    User? user = _context.Users.ToList().Find(x => x.Id == userId);
                    if (User != null)
                    {
                        return user;
                    }
                }
            }
            return null;
        }
        // GET: api/<UserController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var users = _context.Users.ToList().FindAll(x => x.IsDeleted == false);
                return Ok(users);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var user = _context.Users.ToList().Find(x => x.Id == id);
                if (user == null || user.IsDeleted) return NotFound();
                return Ok(user);
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST api/<UserController>
        [Authorize]
        [HttpPost]
        public IActionResult Post(User model)
        {
            try
            {
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                if (user.Role != roles.Admin)
                {
                    return Forbid();
                }
                model.Password = BCrypt.Net.BCrypt.HashPassword(model.Password);
                _context.Users.Add(model);
                _context.SaveChanges();
                return Created($"/api/User/{model.Id}", model);
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT api/<UserController>/5
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User updatedUser)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(p => p.Id == id);

                if (user == null || user.IsDeleted)
                {
                    return NotFound(); // Return 404 if the problem is not found
                }
                User? currentUser = getCurrentUser();
                if (currentUser == null)
                {
                    return Unauthorized();
                }
                if (user.Id != currentUser.Id && currentUser.Role != roles.Admin)
                {
                    return Forbid();
                }

                // Update the properties of existingProblem with the values from the updatedProblem
                user.Username = updatedUser.Username;
                user.Password = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
                user.Email = updatedUser.Email;
                user.IsDeleted = updatedUser.IsDeleted;
                if (currentUser.Role == roles.Admin)
                {
                    user.Role = updatedUser.Role;
                    user.IsCompany = updatedUser.IsCompany;
                }

                _context.SaveChanges();

                return Ok(user); // Return 200 OK if the update is successful, optionally you can return the updated problem
            }
            catch
            {
                return BadRequest();
            }
        }


        // DELETE api/<ProblemController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(p => p.Id == id);
                if (user == null)
                {
                    return NotFound(); // Return 404 if problem not found
                }
                User? currentUser = getCurrentUser();
                if (currentUser == null)
                {
                    return Unauthorized();
                }
                if (user.Id != currentUser.Id && currentUser.Role != roles.Admin)
                {
                    return Forbid();
                }

                user.IsDeleted = true;
                _context.SaveChanges();

                return Ok(user);
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize]
        [HttpDelete("HardDelete/{id}")]
        public IActionResult HardDelete(int id)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(p => p.Id == id);
                if (user == null)
                {
                    return NotFound();
                }
                User? currentUser = getCurrentUser();
                if (currentUser == null)
                {
                    return Unauthorized();
                }
                if (currentUser.Role != roles.Admin)
                {
                    return Forbid();
                }
                _context.Users.Remove(user);
                _context.SaveChanges();
                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}

