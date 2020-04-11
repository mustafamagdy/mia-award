using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class ContestantAwardConfiguration : IEntityTypeConfiguration<ContestantAward> {
    public void Configure(EntityTypeBuilder<ContestantAward> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Manager);
      builder.HasMany(a => a.Contestants).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);

      builder.HasOne(a => a.FirstPlace).WithOne(a => a.WinnerAwardFirstPlace).HasForeignKey<ContestantAward>(a => a.FirstPlaceContestantId);
      builder.HasOne(a => a.SecondPlace).WithOne(a => a.WinnerAwardSecondPlace).HasForeignKey<ContestantAward>(a => a.SecondPlaceContestantId);

    }
  }
}