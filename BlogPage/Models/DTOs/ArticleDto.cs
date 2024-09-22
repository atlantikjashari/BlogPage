using AutoMapper;
using BlogPage.AutoMapper.Profiles;

namespace BlogPage.Models.DTOs
{
    public class ArticleDto
    {
        public Guid ArticleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublicationDate { get; set; } = DateTime.Now;
        public string[]? Tags { get; set; }
        public string Image { get; set; } = string.Empty;
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public UserProfile? User { get; set; }
        public ICollection<CommentProfile> Comments { get; set; }
    }
}
