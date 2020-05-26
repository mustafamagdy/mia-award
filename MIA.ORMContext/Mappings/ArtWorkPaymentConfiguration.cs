using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class ArtWorkPaymentConfiguration : IEntityTypeConfiguration<ArtworkPayment> {
    public void Configure(EntityTypeBuilder<ArtworkPayment> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Artwork).WithOne(a => a.Payment).HasForeignKey<ArtworkPayment>(a => a.ArtworkId);
      builder.OwnsOne(a=>a.Receipt);

    }
  }

}