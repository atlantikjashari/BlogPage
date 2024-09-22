using Microsoft.AspNetCore.Identity;
using System.Reflection.Metadata;

namespace BlogPage.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public ICollection<Article> Articles{ get; set; } = new List<Article>();
    }
}
