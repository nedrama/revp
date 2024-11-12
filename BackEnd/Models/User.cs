using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Contracts;
using System.Xml.Linq;
using BackEnd.helpers;

namespace BackEnd.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(maximumLength: 100)]
        public string Username { get; set; }
        [Required, StringLength(maximumLength: 100)]
        public string Password { get; set; }
        [Required, StringLength(maximumLength: 100)]
        public string Email { get; set; }
        public bool IsCompany { get; set; }
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }
        public string Role {  get; set; }
    }
}
