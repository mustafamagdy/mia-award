using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class VotingCriteriaConfiguration : IEntityTypeConfiguration<VotingCriteria> {
    public void Configure(EntityTypeBuilder<VotingCriteria> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();



      builder.Property(a => a.Name)
        .HasConversion(
            v => JsonConvert.SerializeObject(v, EntityConvensions.Settings),
            v => JsonConvert.DeserializeObject<LocalizedData>(v, EntityConvensions.Settings));

      builder.HasMany(a => a.Votes).WithOne(a => a.Criteria).HasForeignKey(a => a.CriteriaId);
    }
  }

}