using CodePulse.API.Models.Domain;

namespace CodePulse.API.Models.DTO
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string UrlHandle { get; set; }

        public CategoryDto()
        {

        }
        public CategoryDto(Category category)
        {
            this.Id = category.Id;
            this.Name = category.Name;
            this.UrlHandle = category.UrlHandle;
        }
    }
}
