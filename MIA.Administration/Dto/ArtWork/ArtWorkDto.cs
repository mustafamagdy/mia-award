using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api
{
  public class ArtWorkDto
  {
    public string Id { get; set; }

    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }
    public string TrailerPosterUrl { get; set; }
    public LocalizedData Title { get; set; }
    public bool UploadComplete { get; set; }
    public bool AllowFileUpload { get; set; }
    public bool Featured { get; set; }
    public AwardDto Award { get; set; }
    public string AwardId { get; set; }
    //   public NomineeDto Nominee { get; set; }
    public string NomineeId { get; set; }
    //   public ArtWorkPaymentDto Payment { get; set; }
    public string PaymentId { get; set; }
    // public int FileCount { get; set; }
    public ArtWorkPaymentDto Payment { get; set; }
    //public double Rate { get; set; }

    //public string DateOfRelease { get; set; }
    //public string Country { get; set; }
    //public LocalizedData ShowDescription { get; set; }
    //public string Director { get; set; }
    //public string Production { get; set; }
    //public string Writers { get; set; }
    //public string Story { get; set; }
    //public string Stars { get; set; }
    //public string Crew { get; set; }

    // public HashSet<MediaFileDto> MediaFiles { get; set; }
    //public HashSet<JudgeVoteDto> Votes { get; set; }
    //public AwardDto WinnerAwardFirstPlace { get; set; }
    //public string WinnerAwardFirstPlaceId { get; set; }
    //public AwardDto WinnerAwardSecondPlace { get; set; }
    //public string WinnerAwardSecondPlaceId { get; set; }
  }

}