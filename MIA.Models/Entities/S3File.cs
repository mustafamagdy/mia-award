using Microsoft.EntityFrameworkCore;

namespace MIA.Models.Entities {
  [Owned]
  public class S3File {
    public string FileKey { get; set; }
    public string FileUrl { get; set; }

    public static S3File FromKeyAndUrl(string key, string url) {
      return new S3File {
        FileKey = key,
        FileUrl = url
      };
    }
  }
}
