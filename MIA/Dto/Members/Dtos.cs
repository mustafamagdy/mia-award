using MIA.Models.Entities;

namespace MIA.Api {
  public abstract class ArtworkBasicData {
    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }
    public string SiteUrl { get; set; }
    public int ProductionYear { get; set; }
    public int BroadcastYear { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public string ProductionLicenseNumber { get; set; }
    public string ProductionLicenseAgency { get; set; }

  }
  public class ArtworkBasicViewDto : ArtworkBasicData {
    public string Id { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string TrailerPosterUrl { get; set; }
    public string CoverUrl { get; set; }
    public string NomineeAvatar { get; set; }
  }
  public class ArtworkViewDto : ArtworkBasicViewDto {
    public bool CanUploadFiles { get; set; }
    public bool UploadComplete { get; set; }
    public AwardType AwardType { get; set; }
    public LocalizedData AwardTitle { get; set; }
    public decimal AwardFee { get; set; }
    public string TrophyUrl { get; set; }
  }
  public class ArtworkViewWithFilesDto : ArtworkViewDto {
    public ArtworkFileDto[] Files { get; set; }
    public PaymentWithStatusDto Payment { get; set; }
  }

  public class ArtworkFileDto {
    public string FileUrl { get; set; }
    public string Id { get; set; }
    public int Size { get; set; }
  }

  public class AwardWithStatusDto {
    public string Id { get; set; }
    public LocalizedData Name { get; set; }
    public string TrophyUrl { get; set; }
    public bool Winner { get; set; }

    public string ArtworkId { get; set; }
    public LocalizedData ProjectName { get; set; }
    public LocalizedData Description { get; set; }
    public string PosterUrl { get; set; }
  }

  public class ArtworkWithStatusDto {
    public string Id { get; set; }
    public string PosterUrl { get; set; }
    public string TrailerUrl { get; set; }
    public string CoverUrl { get; set; }
    public bool UploadComplete { get; set; }
    public bool AllowFileUpload { get; set; }
    public AwardType AwardType { get; set; }
    public LocalizedData ProjectName { get; set; }
  }

  public class PaymentWithStatusDto {
    public string Id { get; set; }
    public decimal Amount { get; set; }
    public string Date { get; set; }
    public bool IsOffline { get; set; }
    public string Status { get; set; }
  }

  public class UpdateArtworkWithDetails : ArtworkBasicData { }

  public class SubmitArtworkWithDetails : ArtworkBasicData {
    public string PosterFileName { get; set; }
    public string CoverImageFileName { get; set; }
    public byte[] Poster { get; set; }
    public byte[] CoverImage { get; set; }

    public string ResumeFileName { get; set; }
    public byte[] Resume { get; set; }
    public string YourRoleId { get; set; }

    public string File1FileName { get; set; }
    public byte[] File1 { get; set; }
    public string File2FileName { get; set; }
    public byte[] File2 { get; set; }
    public string File3FileName { get; set; }
    public byte[] File3 { get; set; }

    public string AwardId { get; set; }
    //Genre
    public string CategoryId { get; set; }

    // public PaymentDto Payment { get; set; }
  }

  public class PaymentDto {
    public string CardHolderName { get; set; }
    public string CardType { get; set; }
    public string Last4Digit { get; set; }
    public string CardToken { get; set; }
    public string Currency { get; set; }
    public string SessionId { get; set; }
    public string Type { get; set; }

    public string PaymentMethod { get; set; }
    public string ReceiptDate { get; set; }
    public string ReceiptNumber { get; set; }
    public decimal ReceiptAmount { get; set; }

    public string ReceiptFileName { get; set; }
    public byte[] Receipt { get; set; }

  }

  public class PublishArtwork {
    public string Id { get; set; }
    public bool Publish { get; set; }
  }
}
