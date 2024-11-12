using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public string? Comment { get; set; }
        public int? Rating { get; set; }
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
        [ForeignKey("OfGame")]
        public int GameId { get; set; }
        public virtual Game? Game { get; set; }
        [ForeignKey("madeBy")]
        public int UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
