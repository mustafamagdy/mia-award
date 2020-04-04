using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class ArtworkJudgeVoteConfiguration : IEntityTypeConfiguration<ArtworkJudgeVote> {
    public void Configure(EntityTypeBuilder<ArtworkJudgeVote> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Judge).WithMany(a => a.ArtworkVotes).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.Criteria).WithMany(a => a.ArtworkVotes).HasForeignKey(a => a.CriteriaId);
      builder.HasOne(a => a.ArtWork).WithMany(a => a.Votes).HasForeignKey(a => a.ArtworkId);
    }
  }
}