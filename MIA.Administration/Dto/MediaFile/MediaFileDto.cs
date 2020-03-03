using MIA.Administration.Dto.Award;
using MIA.Administration.Dto.User;

namespace MIA.Administration.Api {
  public class MediaFileDto {
    public string Id { get; set; }
    public long UploadDate { get; set; }
    public string Description { get; set; }
    public string FileKey { get; set; }
    public string FileUrl { get; set; }
    public ArtWorkDto ArtWork { get; set; }
    public string ArtWorkId { get; set; }
  }

}