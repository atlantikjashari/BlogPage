using BlogPage.AutoMapper.Profiles;

namespace BlogPage.Models.DTOs
{
    public class CategoryDto
    {

        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

        public ICollection<ArticleProfile> Articles { get; set; }

    }
}


