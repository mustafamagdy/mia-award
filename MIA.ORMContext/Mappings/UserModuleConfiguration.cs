using MIA.Authorization.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings
{
  internal class UserModuleConfiguration : IEntityTypeConfiguration<UserModule> {
    public void Configure(EntityTypeBuilder<UserModule> builder) {

      builder.HasKey(x => x.UserId);
      builder.Property(x => x.UserId).ValueGeneratedOnAdd();

    }
  }
}