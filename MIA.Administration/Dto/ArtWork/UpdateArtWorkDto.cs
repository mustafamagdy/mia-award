
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using System.Collections.Generic;
using MIA.Administration.Api.Base;
using Microsoft.AspNetCore.Http;
using MIA.Models.Entities;

namespace MIA.Administration.Api {
  public class UpdateArtWorkDto : IUpdateDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public bool UploadComplete { get; set; }
    public AwardDto Award { get; set; }
    public string AwardId { get; set; }
    public NomineeDto Nominee { get; set; }
    public string NomineeId { get; set; }
    public ArtWorkPaymentDto Payment { get; set; }
    public string PaymentId { get; set; }
    public int FileCount { get; set; }
    public HashSet<MediaFileDto> MediaFiles { get; set; }
    public HashSet<JudgeVoteDto> Votes { get; set; }

    public byte[] Poster { get; set; }
    public string PosterFileName { get; set; }
    public byte[] Video { get; set; }
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

    public PaymentStatus PaymentStatus { get; set; }
    public byte[] Receipt { get; set; }
    public string ReceiptFileName { get; set; }

    public string TransactionNumber { get; set; }
    public decimal Amount { get; set; }
    public long PaymentDate { get; set; }
  }

}