using CodePulse.API.Models.Domain;

namespace CodePulse.API.Models.DTO
{
    public class BlogPostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public string FeatureImageUrl { get; set; }
        public string UrlHandle { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Author { get; set; }
        public bool IsVisible { get; set; }
        public BlogPostDto()
        {
            
        }
        public BlogPostDto(BLogPost blogPost)
        {
            this.Id = blogPost.Id;
            this.Title = blogPost.Title;
            this.ShortDescription = blogPost.ShortDescription;
            this.Content = blogPost.Content;
            this.FeatureImageUrl = blogPost.FeatureImageUrl;
            this.UrlHandle = blogPost.UrlHandle;
            this.PublishedDate = blogPost.PublishedDate;
            this.Author = blogPost.Author;
            this.IsVisible = blogPost.IsVisible;

        }
    }
}
