using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class JudgeArtworkScoreConfiguration : IEntityTypeConfiguration<JudgeArtworkScore> {
    public void Configure(EntityTypeBuilder<JudgeArtworkScore> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Judge).WithMany(a => a.FinalScores).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.Artwork).WithMany(a => a.FinalScores).HasForeignKey(a => a.ArtworkId);
    }
  }
}
