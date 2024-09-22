namespace BlogPage.AutoMapper.Profiles
{
    public class CommentProfile
    {
        public Guid CommentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
    }
}
