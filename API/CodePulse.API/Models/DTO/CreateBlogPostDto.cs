using CodePulse.API.Models.Domain;

namespace CodePulse.API.Models.DTO
{
    public class CreateBlogPostDto
    {
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string Content { get; set; }
        public string FeatureImageUrl { get; set; }
        public string UrlHandle { get; set; }
        public string Author { get; set; }
        public bool IsVisible { get; set; }
        public DateTime PublishedDate { get; set; }

        public BLogPost MapToDomain()
        {
            return new BLogPost
            {
                Title = this.Title,
                ShortDescription = this.ShortDescription,
                Content = this.Content,
                FeatureImageUrl = this.FeatureImageUrl,
                UrlHandle = this.UrlHandle,
                Author = this.Author,
                IsVisible = this.IsVisible,
                PublishedDate = this.PublishedDate
            };
        }
    }
}
