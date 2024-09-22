using System.ComponentModel.DataAnnotations;

namespace BlogPage.Models.DTOs
{
    public class UserRegisterDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$", ErrorMessage = "Password must contain uppercase and lowercase letters and digits")]
        public string Password { get; set; } = string.Empty;
    }
}
