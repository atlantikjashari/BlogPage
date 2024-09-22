using System.Text.Json.Serialization;

namespace BlogPage.Models
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public Guid? ArticleId { get; set; }
        [JsonIgnore]
        public Article? Article { get; set; }
    }
}
