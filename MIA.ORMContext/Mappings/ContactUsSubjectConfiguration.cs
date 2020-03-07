using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class ContactUsSubjectConfiguration : IEntityTypeConfiguration<ContactUsSubject>
  {
    public void Configure(EntityTypeBuilder<ContactUsSubject> builder)
    {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

  internal class CountryConfiguration : IEntityTypeConfiguration<Country>
  {
    public void Configure(EntityTypeBuilder<Country> builder)
    {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

  internal class ProductionYearConfiguration : IEntityTypeConfiguration<ProductionYear>
  {
    public void Configure(EntityTypeBuilder<ProductionYear> builder)
    {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }
  internal class ArtworkCategoryConfiguration : IEntityTypeConfiguration<ArtworkCategory>
  {
    public void Configure(EntityTypeBuilder<ArtworkCategory> builder)
    {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

  internal class ArtworkGenreConfiguration : IEntityTypeConfiguration<ArtworkGenre>
  {
    public void Configure(EntityTypeBuilder<ArtworkGenre> builder)
    {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();
    }
  }

}