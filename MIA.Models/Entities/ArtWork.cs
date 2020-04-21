using MIA.Models.Entities;
using System;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class ArtWork : BaseContestant {

    public bool UploadComplete { get; set; }
    public bool AllowFileUpload { get; set; }

    public S3File Poster { get; set; }
    public S3File Trailer { get; set; }
    public S3File TrailerPoster { get; set; }
    public S3File Cover { get; set; }


    public ArtWorkPayment Payment { get; set; }
    public string PaymentId { get; set; }
    public ArtworkAward Award { get; set; }
    public string AwardId { get; set; }
    
    public HashSet<MediaFile> MediaFiles { get; set; }
    public HashSet<ArtworkReview> Reviews { get; set; }
    public HashSet<ArtworkJudgeVote> Votes { get; set; }


    public ArtworkAward WinnerAwardFirstPlace { get; set; }
    public string WinnerAwardFirstPlaceId { get; set; }
    public ArtworkAward WinnerAwardSecondPlace { get; set; }
    public string WinnerAwardSecondPlaceId { get; set; }

  }
}
