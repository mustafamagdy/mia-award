﻿using MIA.Models.Entities;
using MIA.ORMContext.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MIA.ORMContext.Mappings {
  internal class AwardConfiguration : IEntityTypeConfiguration<Award> {
    public void Configure(EntityTypeBuilder<Award> builder) {

      builder.HasKey(x => x.Id);
      builder.Property(x => x.Id)
        .HasValueGenerator<SeqIdValueGenerator>()
        .ValueGeneratedOnAdd();


      builder.HasOne(a => a.Trophy);
      builder.HasMany(a => a.JudgeAwards).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);
      builder.HasOne(a => a.Manager);
      builder.HasMany(a => a.ArtWorks).WithOne(a => a.Award).HasForeignKey(a => a.AwardId);
    }
  }

}