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

      builder.Property(x => x.ScoreTotal).HasColumnType("decimal(12,4)");
      builder.Property(x => x.Score).HasColumnType("decimal(12,4)");
      builder.Property(x => x.Percentage).HasColumnType("decimal(12,4)");

      builder.HasOne(a => a.Judge).WithMany(a => a.FinalScores).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.Artwork).WithMany(a => a.FinalScores).HasForeignKey(a => a.ArtworkId);
    }
  }
}
