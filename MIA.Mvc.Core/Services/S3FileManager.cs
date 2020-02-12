using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

    public string GetTempDirectoryForResource(ResourceType resourceType, string resourceId) {
      return $"{resourceType.ToString().ToLower()}/{resourceId}/temp";
    }

    public async Task<string> UploadFileAsync(byte[] file, string key, string bucketName = null,
      bool publicRead = true) {
      using (var mem = new MemoryStream(file)) {
        return await UploadFileAsync(mem, key, bucketName, publicRead);
      }
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
          CannedACL = publicRead ? S3CannedACL.PublicRead : S3CannedACL.Private
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

    public async Task<string> MoveObjectAsync(string sourceKey, string destinationKey, bool publicRead = true) {
      var bucketName = _awsOptions.Value.S3_Content_BucketName;
      return await MoveObjectAsync(sourceKey, bucketName, destinationKey, bucketName, publicRead);
    }

    public async Task<string> MoveObjectAsync(string sourceKey, string sourceBucketName, string destinationKey, string destinationBucketName, bool publicRead = true) {
      using (var client = new AmazonS3Client(
      awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
      awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
      region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {
        //copy file
        await client.CopyObjectAsync(
          new Amazon.S3.Model.CopyObjectRequest() {
            SourceBucket = sourceBucketName,
            DestinationBucket = destinationBucketName,
            SourceKey = sourceKey,
            DestinationKey = destinationKey,
            CannedACL = publicRead ? S3CannedACL.PublicRead : S3CannedACL.Private
          });
        //remove original
        await DeleteFileAsync(sourceKey, sourceBucketName);

        return $"https://{destinationBucketName}.s3.amazonaws.com/{destinationKey}";
      }
    }

    public async Task<ChunkStatus> UploadChunk(string directory, FileChunkDto chunkDto, string bucketName = null) {
      bucketName = bucketName ?? _awsOptions.Value.S3_Content_BucketName;
      bucketName += $"/{directory}/{chunkDto.FileName.GetFileNameWithoutExt()}";
      ChunkStatus response = null;

      try {
        // Retreiving Previous ETags
        var s3ETags = new List<PartETag>();
        if (chunkDto.ETags != null && chunkDto.ETags.Any()) {
          s3ETags = ETagPartToS3ETagPart(chunkDto.ETags).ToList();
        }

        using (var client = new AmazonS3Client(
                 awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
                 awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
                 region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {
          var lastPart = ((chunkDto.TotalChunks - chunkDto.ChunkIndex) == 1) ? true : false;
          var partNumber = chunkDto.ChunkIndex + 1;

          using (var ms = new MemoryStream(chunkDto.Chunk)) {
            //using (var ms = new MemoryStream()) {
            //  chunkDto.Chunk.CopyTo(ms);
            ms.Position = 0;

            //Step 1: build and send a multi upload request
            if (chunkDto.ChunkIndex == 0) {
              var initiateRequest = new InitiateMultipartUploadRequest {
                BucketName = bucketName,
                Key = chunkDto.FileName
              };

              var initResponse = await client.InitiateMultipartUploadAsync(initiateRequest);
              chunkDto.UploadId = initResponse.UploadId;
            }

            //Step 2: upload each chunk (this is run for every chunk unlike the other steps which are run once)
            var uploadRequest = new UploadPartRequest {
              BucketName = bucketName,
              Key = chunkDto.FileName,
              UploadId = chunkDto.UploadId,
              PartNumber = partNumber,
              InputStream = ms,
              IsLastPart = lastPart,
              PartSize = ms.Length
            };

            var uploadResponse = await client.UploadPartAsync(uploadRequest);


            response = new ChunkStatus();
            //Step 3: build and send the multipart complete request
            if (lastPart) {
              s3ETags.Add(new PartETag {
                PartNumber = partNumber,
                ETag = uploadResponse.ETag
              });

              var completeRequest = new CompleteMultipartUploadRequest {
                BucketName = bucketName,
                Key = chunkDto.FileName,
                UploadId = chunkDto.UploadId,
                PartETags = s3ETags
              };

              var result = await client.CompleteMultipartUploadAsync(completeRequest);
              //Set the uploadId and fileURLs with the response.
              response.UploadId = uploadRequest.UploadId;
              response.FinalUrl = result.Location;
              response.FileKey = result.Key;


            } else {
              s3ETags.Add(new PartETag {
                PartNumber = partNumber,
                ETag = uploadResponse.ETag
              });

              response.UploadId = uploadRequest.UploadId;
              response.ETags = S3ETagsToETagPart(s3ETags).ToArray();
            }
          }
        }
      } catch (Exception e) {
        throw e;
      }

      return response;
    }

    private IEnumerable<PartETag> ETagPartToS3ETagPart(IEnumerable<ETagPart> eTags) {
      return eTags.Select(a => new PartETag {
        PartNumber = a.PartNumber,
        ETag = a.ETag
      }).ToArray();
    }

    private IEnumerable<ETagPart> S3ETagsToETagPart(IEnumerable<PartETag> eTags) {
      return eTags.Select(a => new ETagPart {
        PartNumber = a.PartNumber,
        ETag = a.ETag
      }).ToArray();
    }
  }
}
