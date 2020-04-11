using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class ArtworkAwardConfiguration : IEntityTypeConfiguration<ArtworkAward> {
    public void Configure(EntityTypeBuilder<ArtworkAward> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      //builder.HasOne(a => a.Trophy);
      builder.HasMany(a => a.JudgeArtworkAwards).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);
      builder.HasOne(a => a.Manager);
      builder.HasMany(a => a.ArtWorks).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);

      builder.HasOne(a => a.FirstPlace).WithOne(a=>a.WinnerAwardFirstPlace).HasForeignKey<ArtworkAward>(a=>a.FirstPlaceArtworkId);
      builder.HasOne(a => a.SecondPlace).WithOne(a => a.WinnerAwardSecondPlace).HasForeignKey<ArtworkAward>(a => a.SecondPlaceArtworkId);

    }
  }
}