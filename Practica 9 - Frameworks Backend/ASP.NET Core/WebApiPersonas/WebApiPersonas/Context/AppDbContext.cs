using Microsoft.EntityFrameworkCore;
using WebApiPersonas.Modelo;
namespace WebApiPersonas.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Persona> Personas { get; set; }
    }
}