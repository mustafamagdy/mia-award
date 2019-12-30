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

      builder.HasMany(a => a.Judges).WithOne(a => a.JudgeAward).HasForeignKey(a => a.JudgeAwardId);
      builder.HasMany(a => a.Awards).WithOne(a => a.JudgeAward).HasForeignKey(a => a.JudgeAwardId);

    }
  }

}