using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interfaces
{
    public interface IBlogPostRepository
    {
        Task<BLogPost> CreateAsync(BLogPost blogPost);
        Task<BLogPost?> GetByIdAsync(Guid id);
        Task<IEnumerable<BLogPost>> GetAllAsync();
        Task DeleteAsync(Guid id);
        Task UpdateAsync(BLogPost blogPost);
    }
}
