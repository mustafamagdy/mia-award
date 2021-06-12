using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class ContactUsSubjectConfiguration : IEntityTypeConfiguration<ContactUsSubject> {
    public void Configure(EntityTypeBuilder<ContactUsSubject> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

  internal class CountryConfiguration : IEntityTypeConfiguration<Country> {
    public void Configure(EntityTypeBuilder<Country> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

  internal class ProductionYearConfiguration : IEntityTypeConfiguration<ProductionYear> {
    public void Configure(EntityTypeBuilder<ProductionYear> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

  internal class ArtworkGenreConfiguration : IEntityTypeConfiguration<Genre> {
    public void Configure(EntityTypeBuilder<Genre> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasMany(a => a.Artworks).WithOne(a => a.Category).HasForeignKey(a => a.CategoryId);
    }
  }


  internal class ArtworkSubjectConfiguration : IEntityTypeConfiguration<ArtworkSubject> {
    public void Configure(EntityTypeBuilder<ArtworkSubject> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasMany(a => a.Artworks).WithOne(a => a.YourRole).HasForeignKey(a => a.YourRoleId);
    }
  }
}