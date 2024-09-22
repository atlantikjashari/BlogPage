namespace BlogPage.Models
{
    public class Article
    {
        public Guid ArticleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime PublicationDate { get; set; } = DateTime.Now;
        public string[]? Tags { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public Category? Category;
        public Photo? Photo { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}
