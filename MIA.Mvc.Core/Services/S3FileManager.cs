using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using Microsoft.Extensions.Options;
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
  }
}
