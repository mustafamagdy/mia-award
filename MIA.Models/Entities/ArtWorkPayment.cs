﻿namespace MIA.Models.Entities {
  public class ArtWorkPayment : Payment {
    public ArtWork ArtWork { get; set; }
    public string ArtWorkId { get; set; }
    public PaymentStatus PaymentStatus { get; set; }
    public string ReceiptId { get; set; }
    public string ReceiptUrl { get; set; }
  }

}