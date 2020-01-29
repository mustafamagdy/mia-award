﻿using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
using System.Collections.Generic;

namespace MIA.Administration.Api {
  public class ArtWorkDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public bool UploadComplete { get; set; }
    //  public AwardDto Award { get; set; }
    public string AwardId { get; set; }
    //  public NomineeDto Nominee { get; set; }
    public string NomineeId { get; set; }
    //   public ArtWorkPaymentDto Payment { get; set; }
    public string PaymentId { get; set; }
    public int FileCount { get; set; }
    //public HashSet<MediaFileDto> MediaFiles { get; set; }
    //public HashSet<JudgeVoteDto> Votes { get; set; }
  }

}