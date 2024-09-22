using BlogPage.Models;

namespace BlogPage.AutoMapper.Profiles
{
    public class ArticleProfile
    {
        public Guid ArticleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublicationDate { get; set; } = DateTime.Now;
        public string[]? Tags { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
    }
}
