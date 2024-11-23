using System;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using BackEnd.Data;
using BackEnd.helpers;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("")]
    [ApiController]
    public class GameController : ControllerBase
    {

        private readonly RevDbContext _context;
        private ResponseModel<Game> response;
        public GameController(RevDbContext context)
        {
            _context = context;
            response = new ResponseModel<Game>();

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
                    if(User != null)
                    {
                        return user;
                    }
                }
            }
            return null;
        }

        // GET: api/<UserController>
        [HttpGet("api/[controller]")]
        public IActionResult Get()
        {
            try
            {
                var games = _context.Games.ToList().FindAll(x => x.IsDeleted == false);
                return Ok(games);
            }
            catch (Exception ex)
            {
                response.Message = ExceptionMessage.exeptionMessage(ex);
                response.IsSuccess = false;
                return BadRequest(response);
            }
        }
        [HttpGet("api/User/{userId}/[controller]")]
        public IActionResult GetByUser(int userId)
        {
            try
            {
                var user = _context.Users.ToList().Find(x => x.Id == userId);
                if (user == null || user.IsDeleted)
                {
                    response.IsSuccess = false;
                    response.Message = "No such user";
                    return BadRequest(response);
                }
                var games = _context.Games.ToList().FindAll(x => x.UserId == userId && x.IsDeleted == false);
                return Ok(games);
            }
            catch (Exception ex)
            {
                response.Message = ExceptionMessage.exeptionMessage(ex);
                response.IsSuccess = false;
                return BadRequest(response);
            }
        }

        // GET api/<UserController>/5
        [HttpGet("api/[controller]/{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var game = _context.Games.ToList().Find(x => x.Id == id);
                if (game == null || game.IsDeleted) return NotFound();
                response.IsSuccess = true;
                response.Data = game;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message=ExceptionMessage.exeptionMessage(ex);
                response.IsSuccess = false;
                return BadRequest(response);
            }
        }
        [HttpGet("api/User/{userId}/[controller]/{id}")]
        public IActionResult Get(int id, int userId)
        {
            try
            {
                var user = _context.Users.ToList().Find(x => x.Id == userId);
                if (user == null || user.IsDeleted)
                {
                    response.IsSuccess = false;
                    response.Message = "No such user";
                    return BadRequest(response);
                }
                var game = _context.Games.ToList().Find(x => x.Id == id && userId == x.UserId);
                if (game == null || game.IsDeleted) return NotFound();
                response.IsSuccess = true;
                response.Data = game;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message=ExceptionMessage.exeptionMessage(ex);
                response.IsSuccess = false;
                return BadRequest(response);
            }
        }


        // POST api/<UserController>
        [Authorize]
        [HttpPost("api/[controller]")]
        public IActionResult Post(Game model)
        {
            try
            {
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                model.UserId = user.Id;
                 _context.Games.Add(model);
                 _context.SaveChanges();
                 return Created($"/api/Game/{model.Id}", model);
            }
            catch (Exception ex) 
            {
                response.IsSuccess = false;
                response.Message = ExceptionMessage.exeptionMessage(ex);
                return BadRequest(response);
            }
        }

        // PUT api/<UserController>/5
        [Authorize]
        [HttpPut("api/[controller]/{id}")]
        public IActionResult Put(int id, [FromBody] Game updatedGame)
        {
            try
            {
                
                var game = _context.Games.FirstOrDefault(p => p.Id == id);

                if (game == null || game.IsDeleted)
                {
                    return NotFound(); // Return 404 if the problem is not found
                }
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                if (user.Id != game.UserId && user.Role != roles.Admin)
                {
                    return Forbid();
                }

                // Update the properties of existingProblem with the values from the updatedProblem
                game.Title = updatedGame.Title;
                game.Description = updatedGame.Description;
                game.IsDeleted = updatedGame.IsDeleted;

                _context.SaveChanges();

                response.IsSuccess = true;
                response.Data = game;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message =ExceptionMessage.exeptionMessage(ex);
                return BadRequest(response);
            }
        }


        // DELETE api/<ProblemController>/5
        [Authorize]
        [HttpDelete("api/[controller]/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var game = _context.Games.FirstOrDefault(p => p.Id == id);
                if (game == null)
                {
                    return NotFound(); // Return 404 if problem not found
                }
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                if (user.Id != game.UserId && user.Role != roles.Admin)
                {
                    return Forbid();
                }

                game.IsDeleted = true;
                _context.SaveChanges();
                response.IsSuccess = true;
                response.Data = game;
                return Ok(response);
            }
            catch (Exception ex) 
            {
                response.IsSuccess = false;
                response.Message = ExceptionMessage.exeptionMessage(ex);
                return BadRequest(response);
            }
        }
        [Authorize]
        [HttpDelete("api/[controller]/HardDelete/{id}")]
        public IActionResult HardDelete(int id)
        {
            try
            {
                var game = _context.Games.FirstOrDefault(p => p.Id == id);
                if (game == null)
                {
                    return NotFound();
                }
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                if (user.Role != roles.Admin)
                {
                    return Forbid();
                }
                _context.Games.Remove(game);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ExceptionMessage.exeptionMessage(ex);
                return BadRequest(response);
            }
        }
    }
}

