using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace MIA.ORMContext.Mappings {
  internal class BoothConfiguration : IEntityTypeConfiguration<Booth> {
    public void Configure(EntityTypeBuilder<Booth> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasMany(a => a.Purchases).WithOne(a => a.Booth).HasForeignKey(a => a.BoothId);
    }
  }

}