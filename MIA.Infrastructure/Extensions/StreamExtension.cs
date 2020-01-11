using MIA.Infrastructure.Options;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
namespace System {
  public static class StreamExtension {
    public static bool ValidateImage(this MemoryStream content, UploadLimits limis, out string validationError) {
      validationError = "";
      if (content == null) return true;

      if (content.Length / 1024 > limis.AllowedSizeInKB) {
        validationError = "File is too large";
        return false;
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

      if (!validImage)
        validationError = "Invlid file format";

      return validImage;
    }
  }
}