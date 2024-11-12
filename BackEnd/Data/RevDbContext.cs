using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
using System.Data;

namespace BackEnd.Data
{
    public class RevDbContext:DbContext
    {
        public RevDbContext(DbContextOptions<RevDbContext> options)
            : base(options)
        {
        }
        public DbSet<Game> Games { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshToken { get; set; }
    }
}
