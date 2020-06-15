
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
  public class NewArtWorkDto
  {
    public NewArtWorkDto()
    {
      Poster = S3File.FromKeyAndUrl("", "");
      Trailer = S3File.FromKeyAndUrl("", "");
      TrailerPoster = S3File.FromKeyAndUrl("", "");
      Cover = S3File.FromKeyAndUrl("", "");
    }
    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }
    public AwardDto Award { get; set; }
    public string AwardId { get; set; }
    public NomineeDto Nominee { get; set; }
    public string NomineeId { get; set; }
    public ArtWorkPaymentDto Payment { get; set; }
    public string PaymentId { get; set; } 
    public HashSet<MediaFileDto> MediaFiles { get; set; }
    public HashSet<JudgeVoteDto> Votes { get; set; } 
    public long PostedDate { get; set; }
    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }


    public string PosterFileName { get; set; }
    public byte[] PosterByte { get; set; }

    public string CoverFileName { get; set; }
    public byte[] CoverByte { get; set; }

    public string TrailerPosterFileName { get; set; }
    public byte[] TrailerPosterByte { get; set; }

    public S3File Poster { get; set; }
    public S3File Trailer { get; set; }
    public S3File TrailerPoster { get; set; }
    public S3File Cover { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public byte[] Receipt { get; set; }
    public string ReceiptFileName { get; set; }

    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
    public bool IsArtwork { get; set; }
  }

}