using MIA.Models.Entities;
using System;
using System.Collections.Generic;

namespace MIA.Models.Entities {
  public class Artwork : BaseEntity<string> {
    public Artwork() {
      Poster = S3File.FromKeyAndUrl("", "");
      Trailer = S3File.FromKeyAndUrl("", "");
      TrailerPoster = S3File.FromKeyAndUrl("", "");
      Cover = S3File.FromKeyAndUrl("", "");
    }
    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }

    //todo make this nullable
    //for level 1 judge
    public bool IllegibleForJudge { get; set; }
    public bool AllowFileUpload { get; set; }

    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }

    public Nominee Nominee { get; set; }
    public string NomineeId { get; set; }

    public bool UploadComplete { get; set; }

    public S3File Poster { get; set; }
    public S3File Trailer { get; set; }
    public S3File TrailerPoster { get; set; }
    public S3File Cover { get; set; }


    public ArtworkPayment Payment { get; set; }
    public string PaymentId { get; set; }
    public Award Award { get; set; }
    public string AwardId { get; set; }

    public HashSet<MediaFile> MediaFiles { get; set; }
    public HashSet<ArtworkReview> Reviews { get; set; }
    public HashSet<JudgeVote> Votes { get; set; }


    public Award FirstPlace { get; set; }
    public string FirstPlaceId { get; set; }
    public Award SecondPlace { get; set; }
    public string SecondPlaceId { get; set; }

  }
}
