using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/blog-posts")]
    [ApiController]
    public class BlogPostsController(IBlogPostRepository blogPostRepository) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostDto request)
        {
            var blogPost = request.MapToDomain();
            await blogPostRepository.CreateAsync(blogPost);
            return Created();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPostsAsync()
        {
            var blogPosts = await blogPostRepository.GetAllAsync();
            var response = blogPosts.Select(b => new BlogPostDto(b)) ?? [];
            return Ok(response);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            await blogPostRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            var blogPost = await blogPostRepository.GetByIdAsync(id);
            if (blogPost == null) return NotFound();
            var response = new BlogPostDto(blogPost);
            return Ok(response);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateBlogPost([FromRoute] Guid id, [FromBody] UpsertBlogPostDto request)
        {
            var blogPost = await blogPostRepository.GetByIdAsync(id);
            if (blogPost == null) return NotFound();
            blogPost.Title = request.Title;
            blogPost.ShortDescription = request.ShortDescription;
            blogPost.Content = request.Content;
            blogPost.FeatureImageUrl = request.FeatureImageUrl;
            blogPost.UrlHandle = request.UrlHandle;
            blogPost.Author = request.Author;
            blogPost.IsVisible = request.IsVisible;
            blogPost.PublishedDate = request.PublishedDate;
            await blogPostRepository.UpdateAsync(blogPost);
            return Ok();
        }
    }
}
