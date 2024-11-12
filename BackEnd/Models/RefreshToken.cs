using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace BackEnd.Models
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }
        public string Token { get; set; }
        public string JwtId { get; set; }
        public DateTime CreationDate {get; set;}
        public DateTime ExpiryDate { get; set; }
        public bool Used { get; set; }
        [ForeignKey("MadeFor")]
        public int UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
