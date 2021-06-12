using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class BoothPaymentConfiguration : IEntityTypeConfiguration<BoothPayment> {
    public void Configure(EntityTypeBuilder<BoothPayment> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.BoothPurchase).WithOne(a => a.Payment).HasForeignKey<BoothPurchase>(a => a.PaymentId);
      builder.OwnsOne(a=>a.Receipt);
    }
  }

}