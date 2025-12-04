using CodePulse.API.Models.Domain;

namespace CodePulse.API.Models.DTO
{
    public class CreateCategoryRequestDto
    {
        public string Name { get; set; }
        public string UrlHandle { get; set; }

        public Category MapToCategory()
        {
            var category = new Category
            {
                Name = this.Name,
                UrlHandle = this.UrlHandle
            };
            return category;
        }
    }
}
