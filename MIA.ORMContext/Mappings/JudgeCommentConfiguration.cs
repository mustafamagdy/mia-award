using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class JudgeCommentConfiguration : IEntityTypeConfiguration<JudgeComment> {
    public void Configure(EntityTypeBuilder<JudgeComment> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();

      builder.HasOne(a => a.Judge).WithMany(a => a.Comments).HasForeignKey(a => a.JudgeId);
      builder.HasOne(a => a.MediaFile).WithMany(a => a.Comments).HasForeignKey(a => a.JudgeId);
    }
  }

}