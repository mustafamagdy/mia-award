using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class ContestantConfiguration : IEntityTypeConfiguration<Contestant> {
    public void Configure(EntityTypeBuilder<Contestant> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Award).WithMany(a => a.Contestants).HasForeignKey(a => a.AwardId);
      builder.HasOne(a => a.Nominee).WithOne(a => a.Contestant).HasForeignKey<Contestant>(a => a.NomineeId);
    }
  }
}