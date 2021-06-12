using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class NewsConfiguration : IEntityTypeConfiguration<News> {
    public void Configure(EntityTypeBuilder<News> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.Property(a => a.Date).IsRequired();

      builder.HasMany(a => a.Comments).WithOne(a => a.News).HasForeignKey(a => a.NewsId).OnDelete(DeleteBehavior.Cascade);
    }
  }
}