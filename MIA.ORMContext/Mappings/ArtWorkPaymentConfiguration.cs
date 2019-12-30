using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class ArtWorkPaymentConfiguration : IEntityTypeConfiguration<ArtWorkPayment> {
    public void Configure(EntityTypeBuilder<ArtWorkPayment> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.ArtWork).WithOne(a => a.Payment).HasForeignKey<ArtWorkPayment>(a => a.ArtWorkId);

    }
  }

}