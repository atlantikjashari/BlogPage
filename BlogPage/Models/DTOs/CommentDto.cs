using BlogPage.AutoMapper.Profiles;

namespace BlogPage.Models.DTOs
{
    public class CommentDto
    {
        public Guid CommentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
        public ArticleProfile? Article { get; set; }
        public string? UserName { get; set; }
        public string? FirstName { get; set; }
    }
}
