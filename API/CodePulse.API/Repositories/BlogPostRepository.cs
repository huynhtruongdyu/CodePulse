using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

namespace CodePulse.API.Repositories
{
    public class BlogPostRepository(ApplicationDbContext dbContext) : IBlogPostRepository
    {
        public async Task<BLogPost> CreateAsync(BLogPost blogPost)
        {
            dbContext.BLogPosts.Add(blogPost);
            await dbContext.SaveChangesAsync();
            return blogPost;
        }

        public Task DeleteAsync(Guid id)
        {
            var blogPost = dbContext.BLogPosts.Find(id);
            if (blogPost != null)
            {
                dbContext.BLogPosts.Remove(blogPost);
                return dbContext.SaveChangesAsync();
            }
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<BLogPost>> GetAllAsync()
        {
            return await dbContext.BLogPosts.ToListAsync();
        }

        public Task<BLogPost?> GetByIdAsync(Guid id)
        {
            return dbContext.BLogPosts.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task UpdateAsync(BLogPost BlogPost)
        {
            dbContext.Update(BlogPost);
            await dbContext.SaveChangesAsync();
        }
    }
}
