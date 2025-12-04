using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

namespace CodePulse.API.Repositories
{
    public class CategoryRepository(ApplicationDbContext dbContext) : ICategoryRepository
    {
        public async Task<Category> CreateAsync(Category category)
        {
            dbContext.Categories.Add(category);
            await dbContext.SaveChangesAsync();
            return category;
        }

        public Task DeleteAsync(Guid id)
        {
            var category = dbContext.Categories.Find(id);
            if (category != null)
            {
                dbContext.Categories.Remove(category);
                return dbContext.SaveChangesAsync();
            }
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public Task<Category?> GetByIdAsync(Guid id)
        {
            return dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task UpdateAsync(Category category)
        {
            dbContext.Update(category);
            await dbContext.SaveChangesAsync();
        }
    }
}
