using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace MIA.Infrastructure {
  public enum ResourceType {
    News,
    Album,
    Awards,
    Artwork,
    Docs
  }

  public interface IS3FileManager {
    string GenerateFileKeyForResource(ResourceType resourceType, string resourceId, string fileName);
    string GenerateDirectoryKeyForTempUpload(ResourceType resourceType, string resourceId);
    Task<string> UploadFileAsync(Stream stream, string key, string bucketName = null, bool publicRead = true);
    Task DeleteFileAsync(string key, string bucketName = null);
    Task CopyObjectAsync(string sourceKey, string destinationKey);
    Task CopyObjectAsync(string sourceKey, string sourceBucketName, string destinationKey, string destinationBucketName);


    Task<int> GetStartIndex(string sourceDirKey, string bucketName = null);
    Task<ChunkStatus> SaveChunk(string sourceDirKey, FileChunkDto chunk, string bucketName = null);

  }

  public class ChunkStatus {
    public int NextChunkIndex { get; set; }
    public string Status { get; set; }
  }
  public class FileChunkDto {
    public string FileName { get; set; }
    public IFormFile Chunk { get; set; }
    public int TotalChunks { get; set; }
  }
}
