using MIA.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class CategoryImageConfiguration : IEntityTypeConfiguration<CategoryImage> {
    public void Configure(EntityTypeBuilder<CategoryImage> builder) { }
  }
}