using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;
using MIA.Models.Entities;
namespace MIA.Administration.Api {
  public class MediaFileDto {
    public MediaFileDto()
    {
      File = S3File.FromKeyAndUrl("", "");
    }
    public string Id { get; set; }
    public long UploadDate { get; set; }
    public string Description { get; set; }
    public string FileKey { get; set; }
    public string FileUrl { get; set; }
    public ArtWorkDto ArtWork { get; set; }
    public string ArtWorkId { get; set; }
    public S3File File { get; set; }
  }

  public class BasicMediaFileDto
  {
    public string Id { get; set; }
    public string FileKey { get; set; }
    public string FileUrl { get; set; }
  }
}