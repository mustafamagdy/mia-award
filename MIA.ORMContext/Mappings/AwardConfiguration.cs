using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class ArtworkAwardConfiguration : IEntityTypeConfiguration<Award> {
    public void Configure(EntityTypeBuilder<Award> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      //builder.HasOne(a => a.Trophy);
      builder.HasMany(a => a.Level2Judges).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);
      builder.HasOne(a => a.Manager);
      builder.HasMany(a => a.Artworks).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);

      builder.HasOne(a => a.FirstPlace).WithOne(a=>a.FirstPlace).HasForeignKey<Award>(a=>a.FirstPlaceId);
      builder.HasOne(a => a.SecondPlace).WithOne(a => a.SecondPlace).HasForeignKey<Award>(a => a.SecondPlaceId);

    }
  }
}