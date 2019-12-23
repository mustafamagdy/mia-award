using MIA.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class UserImageConfiguration : IEntityTypeConfiguration<UserImage> {
    public void Configure(EntityTypeBuilder<UserImage> builder) { }
  }
}