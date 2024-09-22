namespace BlogPage.Models
{
    public class AuthResult
    {
        public string? FirstName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public ICollection<string>? Roli { get; set; }
        public string? Token { get; set; }
        public bool? Result { get; set; }
    }
}
