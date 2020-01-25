using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class NewsCommentConfiguration : IEntityTypeConfiguration<NewsComment> {
    public void Configure(EntityTypeBuilder<NewsComment> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.News).WithMany(a => a.Comments).HasForeignKey(a => a.NewsId).OnDelete(DeleteBehavior.Cascade);
    }
  }
}