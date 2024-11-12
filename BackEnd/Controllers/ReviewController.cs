using System;
using System.Security.Claims;
using BackEnd.Data;
using BackEnd.helpers;
using BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("/")]
    [ApiController]
    public class ReviewController : ControllerBase
    {

        private readonly RevDbContext _context;
        public ReviewController(RevDbContext context)
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
        [HttpGet("api/[controller]")]
        public IActionResult Get()
        {
            try
            {
                var reviews = _context.Reviews.ToList().FindAll(x => x.IsDeleted == false);
                return Ok(reviews);
            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpGet("api/Game/{gameId}/[controller]")]
        public IActionResult GetByGame(int gameId)
        {
            try
            {
                var game = _context.Games.ToList().Find(x => x.Id == gameId);
                if (game == null || game.IsDeleted)
                {
                    return BadRequest();
                }
                var reviews = _context.Reviews.ToList().FindAll(x => x.GameId == gameId && x.IsDeleted == false);
                return Ok(reviews);
            }
            catch 
            {
                return BadRequest();
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
                    return BadRequest();
                }
                var reviews = _context.Reviews.ToList().FindAll(x => x.UserId == userId && x.IsDeleted == false);
                return Ok(reviews);
            }
            catch 
            {
                return BadRequest();
            }
        }
        [HttpGet("api/User/{userId}/Game/{gameId}/[controller]")]
        public IActionResult GetByUserAndGame(int userId, int gameId)
        {
            try
            {
                var user = _context.Users.ToList().Find(x => x.Id == userId);
                if (user == null || user.IsDeleted)
                {
                    return BadRequest();
                }
                var game = _context.Games.ToList().Find(x => x.UserId == userId && x.Id == gameId);
                if(game == null || game.IsDeleted)
                {
                    return BadRequest();
                }
                var reviews = _context.Reviews.ToList().FindAll(x => x.GameId == game.Id);
                return Ok(reviews);
            }
            catch 
            {
                return BadRequest();
            }
        }

        // GET api/<UserController>/5
        [HttpGet("api/[controller]/{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var review = _context.Reviews.ToList().Find(x => x.Id == id);
                if (review == null || review.IsDeleted) return NotFound();
                return Ok(review);
            }
            catch 
            {
                return BadRequest();
            }
        }

        [HttpGet("api/Game/{gameId}/[controller]/{id}")]
        public IActionResult GetByGame(int id, int gameId)
        {
            try
            {
                var game = _context.Games.ToList().Find(x => x.Id == gameId);
                if (game == null || game.IsDeleted)
                {
                    return BadRequest();
                }
                var review = _context.Reviews.ToList().Find(x => x.Id == id && x.GameId == gameId);
                if (review == null || review.IsDeleted) return NotFound();
                return Ok(review);
            }
            catch 
            {
                return BadRequest();
            }
        }
        [HttpGet("api/User/{userId}/[controller]/{id}")]
        public IActionResult GetByUser(int id, int userId)
        {
            try
            {
                var user = _context.Users.ToList().Find(x => x.Id == userId);
                if (user == null || user.IsDeleted)
                {
                    return BadRequest();
                }
                var review = _context.Reviews.ToList().Find(x => x.Id == id && x.UserId == userId);
                if (review == null || review.IsDeleted) return NotFound();
                return Ok(review);
            }
            catch 
            {
                return BadRequest();
            }
        }
        [HttpGet("api/User/{userId}/Game/{gameId}/[controller]/{id}")]
        public IActionResult GetByGameAndUser(int id, int gameId, int userId)
        {
            try
            {
                var user = _context.Users.ToList().Find(x => x.Id == userId);
                if (user == null || user.IsDeleted)
                {
                    return BadRequest();
                }
                var game = _context.Games.ToList().Find(x => x.UserId == userId && x.Id == gameId);

                if (game == null || game.IsDeleted)
                {
                    return BadRequest();
                }
                var review = _context.Reviews.ToList().Find(x => x.Id == id && x.GameId == game.Id);

                if (review == null || review.IsDeleted) return NotFound();
                return Ok(review);
            }
            catch 
            {
                return BadRequest();
            }
        }

        // POST api/<UserController>
        [Authorize]
        [HttpPost("api/[controller]")]
        public IActionResult Post(Review model)
        {
            try
            {
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                model.UserId = user.Id;
                _context.Reviews.Add(model);
                _context.SaveChanges();
                return Created($"/api/Review/{model.Id}", model);
            }
            catch 
            {
                return BadRequest();
            }
        }

        // PUT api/<UserController>/5
        [Authorize]
        [HttpPut("api/[controller]/{id}")]
        public IActionResult Put(int id, [FromBody] Review updatedReview)
        {
            try
            {
                var review = _context.Reviews.FirstOrDefault(p => p.Id == id);

                if (review == null || review.IsDeleted)
                {
                    return NotFound(); // Return 404 if the problem is not found
                }
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                if (user.Id != review.UserId && user.Role != roles.Admin)
                {
                    return Forbid();
                }

                // Update the properties of existingProblem with the values from the updatedProblem
                review.Comment = updatedReview.Comment;
                review.Rating = updatedReview.Rating;
                review.IsDeleted= updatedReview.IsDeleted;
                review.GameId = updatedReview.GameId;
                review.Game = updatedReview.Game;

                _context.SaveChanges();

                return Ok(review); // Return 200 OK if the update is successful, optionally you can return the updated problem
            }
            catch 
            {
                return BadRequest(); // Return 500 Internal Server Error if an exception occurs
            }
        }


        // DELETE api/<ProblemController>/5
        [Authorize]
        [HttpDelete("api/[controller]/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var review = _context.Reviews.FirstOrDefault(p => p.Id == id);
                if (review == null)
                {
                    return NotFound(); // Return 404 if problem not found
                }
                User? user = getCurrentUser();
                if (user == null)
                {
                    return Unauthorized();
                }
                if (user.Id != review.UserId && user.Role != roles.Admin)
                {
                    return Forbid();
                }
                review.IsDeleted = true;
                _context.SaveChanges();

                return Ok(review); 
            }
            catch 
            {
                return BadRequest(); 
            }
        }
        [Authorize]
        [HttpDelete("api/[controller]/HardDelete/{id}")]
        public IActionResult HardDelete(int id)
        {
            try
            {
                var review = _context.Reviews.FirstOrDefault(p => p.Id == id);
                if (review == null)
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
                _context.Reviews.Remove(review);
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

