using CodePulse.API.Data;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CodePulse.API.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController(ICategoryRepository categoryRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await categoryRepository.GetAllAsync();
            return Ok(categories);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var category = await categoryRepository.GetByIdAsync(id);
            if (category == null) return NotFound();
            var response = new CategoryDto(category);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewCategory([FromBody] CreateCategoryRequestDto request)
        {
            var category = request.MapToCategory();
            await categoryRepository.CreateAsync(category);
            return Created();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            await categoryRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, [FromBody]  CategoryDto category)
        {
            var cat = await categoryRepository.GetByIdAsync(id);
            if (cat == null) return NotFound();
            cat.Name = category.Name;
            cat.UrlHandle = category.UrlHandle;
            await categoryRepository.UpdateAsync(cat);
            return Ok();
        }
    }
}
