using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class BoothPurchaseConfiguration : IEntityTypeConfiguration<BoothPurchase> {
    public void Configure(EntityTypeBuilder<BoothPurchase> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Booth).WithMany(a => a.Purchases).HasForeignKey(a => a.BoothId);
      builder.HasOne(a => a.Payment).WithOne(a => a.BoothPurchase).HasForeignKey<BoothPurchase>(a => a.PaymentId);
    }
  }

}