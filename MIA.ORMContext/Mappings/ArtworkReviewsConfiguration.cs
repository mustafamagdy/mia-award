using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class ArtworkReviewsConfiguration : IEntityTypeConfiguration<ArtworkReview>
  {
    public void Configure(EntityTypeBuilder<ArtworkReview> builder)
    {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Artwork).WithMany(a => a.Reviews).HasForeignKey(a => a.ArtworkId).OnDelete(DeleteBehavior.Cascade);
    }
  }
}