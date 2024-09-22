namespace BlogPage.Models
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<Article> Articles { get; set; } = new List<Article>();
    }
}
