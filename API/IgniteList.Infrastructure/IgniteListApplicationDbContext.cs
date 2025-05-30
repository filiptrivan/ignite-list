using Microsoft.EntityFrameworkCore;
using IgniteList.Business.Entities;
using Spiderly.Infrastructure;

namespace IgniteList.Infrastructure
{
    public partial class IgniteListApplicationDbContext : ApplicationDbContext<UserExtended> // https://stackoverflow.com/questions/41829229/how-do-i-implement-dbcontext-inheritance-for-multiple-databases-in-ef7-net-co
    {
        public IgniteListApplicationDbContext(DbContextOptions<IgniteListApplicationDbContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync(cancellationToken);
        }

    }
}
