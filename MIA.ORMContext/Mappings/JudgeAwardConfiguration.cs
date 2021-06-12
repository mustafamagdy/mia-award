using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class JudgeAwardConfiguration : IEntityTypeConfiguration<JudgeAward> {
    public void Configure(EntityTypeBuilder<JudgeAward> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Judge).WithMany(a => a.Awards).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.Award).WithMany(a => a.AllJudges).HasForeignKey(a => a.AwardId);
    }
  }
}