using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class AlbumItemConfiguration : IEntityTypeConfiguration<AlbumItem> {
    public void Configure(EntityTypeBuilder<AlbumItem> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Album).WithMany(a => a.MediaItems).HasForeignKey(a => a.AlbumId);
    }
  }
}