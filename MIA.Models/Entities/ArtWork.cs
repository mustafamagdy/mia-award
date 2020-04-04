using MIA.Models.Entities;
using System;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class ArtWork : BaseContestant {
    public LocalizedData Title { get; set; }
    public bool UploadComplete { get; set; }
    public bool AllowFileUpload { get; set; }
    public bool Featured { get; set; }
  
    public ArtWorkPayment Payment { get; set; }
    public string PaymentId { get; set; }
    //public int FileCount { get; set; }
    public HashSet<MediaFile> MediaFiles { get; set; }
    //front end user's reviews (comments)
    public HashSet<ArtworkReview> Reviews { get; set; }

    public HashSet<ArtworkJudgeVote> Votes { get; set; }


    public string PosterId { get; set; }
    public string PosterUrl { get; set; }

    public string TrailerId { get; set; }
    public string TrailerUrl { get; set; }
    public string TrailerPosterId { get; set; }
    public string TrailerPosterUrl { get; set; }

    public string CoverId { get; set; }
    public string CoverUrl { get; set; }

    public long PostedDate { get; set; }
    public string DateOfRelease { get; set; }
    public string Country { get; set; }
    public LocalizedData ShowDescription { get; set; }
    public string Director { get; set; }
    public string Production { get; set; }
    public string Writers { get; set; }
    public string Story { get; set; }
    public string Stars { get; set; }
    public string Crew { get; set; } 
    public double Rate { get; set; }
  }
}
