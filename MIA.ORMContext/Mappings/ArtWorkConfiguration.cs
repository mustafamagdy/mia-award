using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class ArtWorkConfiguration : IEntityTypeConfiguration<ArtWork> {
    public void Configure(EntityTypeBuilder<ArtWork> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

     
      builder.HasOne(a => a.Payment).WithOne(a => a.ArtWork).HasForeignKey<ArtWork>(a => a.Id);
      builder.HasOne(a => a.Award).WithMany(a => a.ArtWorks).HasForeignKey(a => a.AwardId);
      builder.HasOne(a => a.Nominee).WithMany(a => a.ArtWorks).HasForeignKey(a => a.NomineeId);
      builder.HasMany(a => a.MediaFiles).WithOne(a => a.ArtWork).HasForeignKey(a => a.ArtWorkId);
    }
  }
}