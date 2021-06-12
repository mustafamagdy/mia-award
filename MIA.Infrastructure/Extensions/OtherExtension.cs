using MIA.Infrastructure.Options;
using Microsoft.AspNetCore.Http;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace System {
  public static class OtherExtension {
    public static string GetFileExt(this IFormFile file) {
      return Path.GetExtension(file.FileName);
    }
    public static string GetFileNameWithoutExt(this IFormFile file) {
      return Path.GetFileNameWithoutExtension(file.FileName);
    }

    public static (bool, string) ValidateImageFileSizeAndContent(this IFormFile file, UploadLimits limits) {
      return ValidateImage(limits, file.OpenReadStream());
    }


    private static (bool, string) ValidateImage(UploadLimits limis, Stream content) {
      if (content == null) return (true, "");

      if (content.Length / 1024 > limis.AllowedSizeInKB) {
        return (false, "File is too large");
      }
      var i = System.Drawing.Image.FromStream(content);
      content.Seek(0, SeekOrigin.Begin);

      var validExt = limis.AllowedExt.Split(",");
      var validImage = false;
      validImage = validImage || validExt.Any(ext => {
        switch (ext) {
          case "png": return ImageFormat.Png.Equals(i.RawFormat);
          case "jpg": case "jpeg": return ImageFormat.Jpeg.Equals(i.RawFormat);
          case "gif": return ImageFormat.Gif.Equals(i.RawFormat);
          default:
            return false;
        }
      });

      if (!validImage) return (false, "Invlid file format");
      else return (true, "");
    }
  }
}
