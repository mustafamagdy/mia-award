using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class AlbumConfiguration : IEntityTypeConfiguration<Album> {
    public void Configure(EntityTypeBuilder<Album> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.Property(a => a.Title)
     .HasConversion(
         v => JsonConvert.SerializeObject(v, EntityConvensions.Settings),
         v => JsonConvert.DeserializeObject<LocalizedData>(v, EntityConvensions.Settings));

      builder.HasMany(a => a.MediaItems).WithOne(a => a.Album).HasForeignKey(a => a.AlbumId);
    }
  }
}