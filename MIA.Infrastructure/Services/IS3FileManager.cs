using System.IO;
using System.Threading.Tasks;

namespace MIA.Infrastructure {
  public enum ResourceType {
    News,
    Album
  }

  public interface IS3FileManager {
    string GenerateFileKeyForResource(ResourceType resourceType, string resourceId, string fileName);
    Task<string> UploadFileAsync(Stream stream, string key, string bucketName = null, bool publicRead = true);
    Task DeleteFileAsync(string key, string bucketName = null);
  }
}
