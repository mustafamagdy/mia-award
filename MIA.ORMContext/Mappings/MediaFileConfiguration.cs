using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class MediaFileConfiguration : IEntityTypeConfiguration<MediaFile> {
    public void Configure(EntityTypeBuilder<MediaFile> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.ArtWork).WithMany(a => a.MediaFiles).HasForeignKey(a => a.ArtWorkId);
      builder.HasMany(a => a.Comments).WithOne(a => a.MediaFile).HasForeignKey(a => a.MediaFileId);
    }
  }

}