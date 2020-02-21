using Microsoft.AspNetCore.Http;
using System.IO;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace MIA.Infrastructure {
  public enum ResourceType {
    News,
    Album,
    Awards,
    ArtWork,
    ArtWrokPayment,
    Docs
  }

  public interface IS3FileManager {
    string GenerateFileKeyForResource(ResourceType resourceType, string resourceId, string fileName);
    string GetTempDirectoryForResource(ResourceType resourceType, string resourceId);
    Task<string> UploadFileAsync(Stream stream, string key, string bucketName = null, bool publicRead = true);
    Task<string> UploadFileAsync(byte[] file, string key, string bucketName = null, bool publicRead = true);
    Task DeleteFileAsync(string key, string bucketName = null);
    Task CopyObjectAsync(string sourceKey, string destinationKey);
    Task CopyObjectAsync(string sourceKey, string sourceBucketName, string destinationKey, string destinationBucketName);
    Task<string> MoveObjectAsync(string sourceKey, string destinationKey, bool publicRead = true);
    Task<string> MoveObjectAsync(string sourceKey, string sourceBucketName, string destinationKey, string destinationBucketName, bool publicRead = true);


    Task<ChunkStatus> UploadChunk(string directory, FileChunkDto chunkDto, string bucketName = null);

  }

  public class ETagPart {
    public int PartNumber { get; set; }
    public string ETag { get; set; }
  }

  public class ChunkStatus {
    public ETagPart[] ETags { get; set; }
    public string UploadId { get; set; }
    public string FinalUrl { get; set; }
    [IgnoreDataMember]
    public string FileKey { get; set; }


  }
  public class FileChunkDto {
    public string FileName { get; set; }
    public string UploadId { get; set; }
    public int ChunkIndex { get; set; }
    public int TotalChunks { get; set; }
    public byte[] Chunk { get; set; }
    public ETagPart[] ETags { get; set; }
  }
}
