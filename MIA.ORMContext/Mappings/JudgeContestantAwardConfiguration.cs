using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class JudgeContestantAwardConfiguration : IEntityTypeConfiguration<JudgeContestantAward> {
    public void Configure(EntityTypeBuilder<JudgeContestantAward> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Judge).WithMany(a => a.JudgeContestantAwards).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.Award).WithMany(a => a.JudgeContestantAwards).HasForeignKey(a => a.AwardId);

    }
  }
}