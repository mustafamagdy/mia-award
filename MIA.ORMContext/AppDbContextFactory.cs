using System.IO;
using MIA.ORMContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MIA {
  public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext> {
    public AppDbContext CreateDbContext(string[] args) {
      var configuration = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json")
        .Build();

      var dbContextBuilder = new DbContextOptionsBuilder<AppDbContext>();

      var connectionString = configuration.GetConnectionString("DbConnection");

      dbContextBuilder.UseSqlServer(connectionString);

      return new AppDbContext(dbContextBuilder.Options);
    }
  }
}