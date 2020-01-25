using System.IO;
using System.Threading.Tasks;

namespace MIA.Mvc.Core {
  public interface IS3FileManager {
    Task<string> UploadFile(Stream stream, string key, string bucketName = null, bool publicRead = true);
    Task DeleteFile(string key, string bucketName = null);
  }
}
