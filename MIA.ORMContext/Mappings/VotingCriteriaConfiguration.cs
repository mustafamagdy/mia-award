using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class ArtworkVotingCriteriaConfiguration : IEntityTypeConfiguration<VotingCriteria> {
    public void Configure(EntityTypeBuilder<VotingCriteria> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Award).WithMany(a => a.VotingCriterias).HasForeignKey(a => a.AwardId).IsRequired(false);
      builder.HasMany(a => a.ArtworkVotes).WithOne(a => a.Criteria).HasForeignKey(a => a.CriteriaId);
    }
  }
}