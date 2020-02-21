﻿using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class MediaFile : BaseEntity<string> {
    public long UploadDate { get; set; }
    public string Description { get; set; }

    public string FileKey { get; set; }
    public string FileUrl { get; set; }

    public ArtWork ArtWork { get; set; }
    public string ArtWorkId { get; set; }

    public HashSet<JudgeComment> Comments { get; set; }
  }
}
