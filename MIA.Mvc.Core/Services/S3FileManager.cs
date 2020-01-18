using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
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

    public async Task DeleteFile(string key, string bucketName = null) {
      bucketName = bucketName ?? _awsOptions.Value.S3_Content_BucketName;
      using (var client = new AmazonS3Client(
      awsAccessKeyId: _awsOptions.Value.S3_Content_AccessKey,
      awsSecretAccessKey: _awsOptions.Value.S3_Content_SecretKey,
      region: RegionEndpoint.GetBySystemName(_awsOptions.Value.S3_Content_Region))) {
        await client.DeleteObjectAsync(
          new Amazon.S3.Model.DeleteObjectRequest() { BucketName = bucketName, Key = key });
      }
    }

    public async Task<string> UploadFile(Stream stream, string key, string bucketName = null, bool publicRead = true) {

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
  }
}
