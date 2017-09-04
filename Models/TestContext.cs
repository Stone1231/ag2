using Microsoft.EntityFrameworkCore;
namespace ag2.Models
{
    public class TestContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlite("Filename=./test.db");
        }

        public TestContext(DbContextOptions<TestContext> options)
      : base(options)
        { }
    }
}