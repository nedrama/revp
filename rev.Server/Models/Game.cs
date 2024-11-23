using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required, StringLength(maximumLength: 100)]
        public string Title { get; set; }
        public string? Description { get; set; }
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
        [ForeignKey("MadeBy")]
        public int UserId { get; set; }
        public virtual User? User { get; set; }
    }
}
