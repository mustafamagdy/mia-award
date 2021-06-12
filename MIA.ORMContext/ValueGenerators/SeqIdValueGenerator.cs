﻿using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;

namespace MIA.ORMContext.ValueGenerators
{
  public class SeqIdValueGenerator : ValueGenerator<string>
  {
    public override bool GeneratesTemporaryValues => false;
    public override string Next(EntityEntry entry) {
      return NUlid.Ulid.NewUlid().ToString().ToLower();
    }
  }
}
