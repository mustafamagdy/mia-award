using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class ArtWorkConfiguration : IEntityTypeConfiguration<Artwork> {
    public void Configure(EntityTypeBuilder<Artwork> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Payment).WithOne(a => a.Artwork).HasForeignKey<Artwork>(a => a.Id);
      builder.HasOne(a => a.Award).WithMany(a => a.Artworks).HasForeignKey(a => a.AwardId);
      builder.HasOne(a => a.Nominee).WithMany(a => a.Artworks).HasForeignKey(a => a.NomineeId);
      builder.HasMany(a => a.MediaFiles).WithOne(a => a.ArtWork).HasForeignKey(a => a.ArtWorkId);

      builder.OwnsOne(a => a.Poster);
      builder.OwnsOne(a => a.Trailer);
      builder.OwnsOne(a => a.TrailerPoster);
      builder.OwnsOne(a => a.Cover);

    }
  }
}