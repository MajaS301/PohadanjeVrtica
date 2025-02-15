using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {

        }

        public DbSet<Skupina> Skupine { get; set; }

    }
}
