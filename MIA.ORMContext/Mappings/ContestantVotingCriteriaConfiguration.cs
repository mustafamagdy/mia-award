using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class ContestantVotingCriteriaConfiguration : IEntityTypeConfiguration<ContestantVotingCriteria> {
    public void Configure(EntityTypeBuilder<ContestantVotingCriteria> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Award).WithMany(a => a.VotingCriterias).HasForeignKey(a => a.AwardId);
      builder.HasMany(a => a.ContestantVotes).WithOne(a => a.Criteria).HasForeignKey(a => a.CriteriaId);
    }
  }
}