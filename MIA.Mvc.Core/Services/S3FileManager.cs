using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MIA.Mvc.Core {
  public class S3FileManager : IS3FileManager {
    private readonly IOptions<AwsOptions> _awsOptions;

    public S3FileManager(IOptions<AwsOptions> awsOptions) {
      this._awsOptions = awsOptions;
    }

    public async Task DeleteFileAsync(string key, string bucketName = null) {
      bucketName = bucketName ?? _awsOptions.Value.S3_Content_BucketName;
      using (var client = new AmazonS3Client(
      awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
      awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
      region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {
        await client.DeleteObjectAsync(
          new Amazon.S3.Model.DeleteObjectRequest() { BucketName = bucketName, Key = key });
      }
    }

    public string GenerateFileKeyForResource(ResourceType resourceType, string resourceId, string fileName) {
      return $"{resourceType.ToString().ToLower()}/{resourceId}/{fileName}";
    }

    public string GenerateDirectoryKeyForTempUpload(ResourceType resourceType, string resourceId) {
      return $"{resourceType.ToString().ToLower()}/{resourceId}/temp";
    }

    public async Task<string> UploadFileAsync(Stream stream, string key, string bucketName = null, bool publicRead = true) {
      bucketName = bucketName ?? _awsOptions.Value.S3_Content_BucketName;
      using (var client = new AmazonS3Client(
        awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
        awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
        region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {
        var uploadRequest = new TransferUtilityUploadRequest {
          InputStream = stream,
          Key = key,
          BucketName = bucketName,
          CannedACL = publicRead ? S3CannedACL.PublicRead : S3CannedACL.NoACL
        };

        var fileTransferUtility = new TransferUtility(client);
        await fileTransferUtility.UploadAsync(uploadRequest);
        //https://[application.bucket].s3.amazonaws.com/[key]
        return $"https://{bucketName}.s3.amazonaws.com/{key}";
      }
    }

    public async Task CopyObjectAsync(string sourceKey, string destinationKey) {
      var bucketName = _awsOptions.Value.S3_Content_BucketName;
      await CopyObjectAsync(sourceKey, bucketName, destinationKey, bucketName);
    }

    public async Task CopyObjectAsync(string sourceKey, string sourceBucketName, string destinationKey, string destinationBucketName) {
      using (var client = new AmazonS3Client(
      awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
      awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
      region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {
        await client.CopyObjectAsync(
          new Amazon.S3.Model.CopyObjectRequest() {
            SourceBucket = sourceBucketName,
            DestinationBucket = destinationBucketName,
            SourceKey = sourceKey,
            DestinationKey = destinationKey
          });
      }
    }

    private static string addDelimiterToPrefix(string prefix) {
      string delimiter = "/";
      if (!prefix.EndsWith(delimiter)) {
        prefix += delimiter;
      }
      return prefix;
    }

    public async Task<int> GetStartIndex(string sourceDirKey, string bucketName = null) {
      int index = 0;
      bucketName = _awsOptions.Value.S3_Content_BucketName;
      using (var client = new AmazonS3Client(
                  awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
                  awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
                  region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {


        var request = new ListObjectsV2Request {
          Prefix = addDelimiterToPrefix(sourceDirKey),
          BucketName = bucketName,
          MaxKeys = 1000,
        };

        ListObjectsV2Response response;
        do {
          response = await client.ListObjectsV2Async(request);
          foreach (S3Object entry in response.S3Objects) {
            if (entry.Key.EndsWith(".part")) {
              int i = 0;
              if (int.TryParse(entry.Key.Substring(entry.Key.LastIndexOf("/") + 1, entry.Key.Length - entry.Key.LastIndexOf(".part") - 4), out i)) {
                index = Math.Max(i, index);
              }
            }
          }
          request.ContinuationToken = response.NextContinuationToken;
        } while (response.IsTruncated);
      }

      return index;
    }


    public async Task<ChunkStatus> SaveChunk(string sourceDirKey, FileChunkDto chunk, string bucketName = null) {
      try {
        bucketName = _awsOptions.Value.S3_Content_BucketName;
        using (var client = new AmazonS3Client(
                  awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
                  awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
                  region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {

          using (var chunkStream = new MemoryStream()) {
            string status = "";
            chunk.Chunk.CopyTo(chunkStream);
            var maxCompletedChunk = await GetStartIndex(sourceDirKey);
            // Save the chunk file in temporery location with .part extension
            var saveFileKey = $"{sourceDirKey}/{++maxCompletedChunk}.part";

            var uploadRequest = new TransferUtilityUploadRequest {
              InputStream = chunkStream,
              Key = saveFileKey,
              BucketName = bucketName,
              CannedACL = S3CannedACL.Private
            };

            var fileTransferUtility = new TransferUtility(client);
            await fileTransferUtility.UploadAsync(uploadRequest);

            status = "chunk saved";
            if (maxCompletedChunk == chunk.TotalChunks) {
              //merge all .part files
              await MergeChunkFiles(sourceDirKey, $"{chunk.FileName.GetFileNameWithoutExt()}.{chunk.FileName.GetFileExt()}");
              status = "file saved";
            }

            return new ChunkStatus { NextChunkIndex = maxCompletedChunk, Status = status };
          }
        }
      } catch (Exception e) {
        throw e;
      }
    }

    private async Task MergeChunkFiles(string sourceDirKey, string fileName, string bucketName = null) {
      var maxFileNumber = GetStartIndex(sourceDirKey, bucketName);
      try {

      
      fileName = Path.Combine(fullPath, fileName);
      Func<int, string> _partFileName = (int index) => string.Format(Path.Combine(fullPath, $"{index}.part"));
      if (!System.IO.File.Exists(fileName)) {
        using (var fs = System.IO.File.Create(fileName)) {
          fs.Close();
        }
      }
      using (FileStream stream = new FileStream(fileName, FileMode.Append, FileAccess.Write, FileShare.None)) {
        for (int i = 1; i <= maxFileNumber; i++) {
          using (var partFile = new FileStream(_partFileName(i), FileMode.Open, FileAccess.Read, FileShare.None)) {
            partFile.Seek(0, SeekOrigin.Begin);
            await partFile.CopyToAsync(stream);
          }
        }
      }

      //delete all .part files
      var allParts = Directory.GetFiles(fullPath, "*.part");
      foreach (var part in allParts) {
        System.IO.File.Delete(part);
      }

      } catch (Exception ex) {
        throw ex;
      }
    }


  }
}
