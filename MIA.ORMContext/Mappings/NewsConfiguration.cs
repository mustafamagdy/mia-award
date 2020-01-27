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

      builder.Property(a => a.Title)
        .HasConversion(
            v => JsonConvert.SerializeObject(v, EntityConvensions.Settings),
            v => JsonConvert.DeserializeObject<LocalizedData>(v, EntityConvensions.Settings));

      builder.Property(a => a.Body)
        .HasConversion(
            v => JsonConvert.SerializeObject(v, EntityConvensions.Settings),
            v => JsonConvert.DeserializeObject<LocalizedData>(v, EntityConvensions.Settings));

      builder.Property(a => a.PosterUrl).HasMaxLength(1000);
      builder.Property(a => a.PosterId).HasMaxLength(1000);
      builder.Property(a => a.Date).IsRequired();

      builder.HasMany(a => a.Comments).WithOne(a => a.News).HasForeignKey(a => a.NewsId).OnDelete(DeleteBehavior.Cascade);
    }
  }
}