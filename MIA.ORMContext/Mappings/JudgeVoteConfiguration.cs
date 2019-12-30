using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class JudgeVoteConfiguration : IEntityTypeConfiguration<JudgeVote> {
    public void Configure(EntityTypeBuilder<JudgeVote> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Judge).WithMany(a => a.Votes).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.Criteria).WithMany(a => a.Votes).HasForeignKey(a => a.CriteriaId);
      builder.HasOne(a => a.ArtWork).WithMany(a => a.Votes).HasForeignKey(a => a.ArtWorkId);
    }
  }

}