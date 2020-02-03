using System.IO;
using System.Threading.Tasks;

namespace MIA.Infrastructure {
  public enum ResourceType {
    News,
    Album,
    Awards,
    Artwork
  }

  public interface IS3FileManager {
    string GenerateFileKeyForResource(ResourceType resourceType, string resourceId, string fileName);
    Task<string> UploadFileAsync(Stream stream, string key, string bucketName = null, bool publicRead = true);
    Task DeleteFileAsync(string key, string bucketName = null);
    Task CopyObjectAsync(string sourceKey, string destinationKey);
    Task CopyObjectAsync(string sourceKey, string sourceBucketName, string destinationKey, string destinationBucketName);
  }
}
