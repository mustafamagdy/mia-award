using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using MIA.TemplateParser;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using MIA.Exceptions;
using MIA.Providers;
using X.PagedList;
using Microsoft.AspNetCore.Http;
using Amazon.S3.Transfer;
using Amazon.S3;
using System.IO;
using Amazon;
using MIA.Api.Base;
using MIA.Dto.Auth;
using MIA.Infrastructure;

namespace MIA.Administration.Api {
  /// <summary>
  /// Test controller for checking internal features
  /// </summary>
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/test")]
  public class TestController : BaseApiController<TestController> {

    /// <summary>
    /// 
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="logger"></param>
    public TestController(
      [FromServices] IMapper mapper, [FromServices] ILogger<TestController> logger
    ) : base(logger, mapper) { }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="db"></param>
    /// <returns></returns>
    [HttpGet]
    public IActionResult ProjectWithPagination([FromServices] IAppUnitOfWork db) {
      return IfFound(
        db
        .Users
        .ProjectTo<UserDetailsDto>(_mapper.ConfigurationProvider)
        .ToPagedList(2, 5)
      );


    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="cultureCode"></param>
    /// <param name="emailSender"></param>
    /// <param name="emailTemplateProvider"></param>
    /// <returns></returns>
    [HttpGet("email/{cultureCode}")]
    public async Task<IActionResult> TestEmail(
      string cultureCode, [FromServices] IEmailSender emailSender, [FromServices] ICultureEmailTemplateProvider emailTemplateProvider) {
      _logger.LogInformation("Sending email using " + emailSender.GetType().FullName);

      string htmlMessage = await emailTemplateProvider.GetHtmlMessageAsync(cultureCode, "forgotPassword.html",
        new Dictionary<string, string> { { "link", "http://www.google.com" },
          { "fullName", "Test Name" }
        });

      try {
        await emailSender.SendEmailAsync(
          "mustafa.magdy1@gmail.com",
          "Reset Password",
          htmlMessage);
        return Ok("Done");

      } catch (Exception ex) {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet]
    public async Task<IActionResult> TestCache([FromServices] IDistributedCache cache) {
      if (cache.GetString("test") == null) {
        cache.SetString("test", "the cached value");
      }

      var val = cache.GetString("test");
      return Ok(val);
    }

    [HttpGet("exp")]
    public async Task<IActionResult> TestException() {
      throw new ApiException("Test Exception", null, ApiErrorType.RecordNotFound);
    }

    [HttpGet("vexp")]
    public async Task<IActionResult> TestValidationException() {
      var user = new AppUser();
      throw new ValidationException(user, null);
    }

   
    [HttpGet("gen-email/{templatename}/{cultureCode}")]
    public async Task<IActionResult> GenerateEmail(
      [FromRoute] string templatename, [FromRoute] string cultureCode,
      [FromBody] Dictionary<string, string> data,
      [FromServices] ICultureEmailTemplateProvider emailTemplateProvider) {

      string htmlMessage = await emailTemplateProvider
        .GetHtmlMessageAsync(cultureCode, $"{templatename}.html", data);

      return Ok(htmlMessage);
    }


    [HttpGet("gen-email3")]
    public async Task<IActionResult> GenerateEmail3(
       [FromServices] ITemplateParser templateParser
       ) {
      var result = await templateParser.LoadAndParse("test1", locale: "_en",
        new Test1[]{
          new Test1(){
          Name = "Ahmed",
          Age = 10
        },
          new Test1{
          Name = "Ali",
          Age = 12
        }
        });

      return Ok(result);
    }


    [HttpPost("upload-s3")]
    public async Task<IActionResult> UploadS3(IFormFile file) {
      using (var client = new AmazonS3Client("AKIAWESSA665T54GZGW3", "eZnVaD8WoMFNcFOXu8uqUOcWewhjr7sNmegUjILx", RegionEndpoint.USEast1)) {
        using (var newMemoryStream = new MemoryStream()) {
          file.CopyTo(newMemoryStream);

          var uploadRequest = new TransferUtilityUploadRequest {
            InputStream = newMemoryStream,
            Key = file.FileName,
            BucketName = "mediauploads1",
            CannedACL = S3CannedACL.NoACL
          };

          var fileTransferUtility = new TransferUtility(client);
          await fileTransferUtility.UploadAsync(uploadRequest);
        }
      }

      return Ok();
    }


    [HttpPost("artwork/{id}/files")]
    public async Task<IActionResult> UploadArtworkFiles(
      [FromRoute] string id,
      [FromServices] IAppUnitOfWork db,
      [FromServices] IS3FileManager fileManager,
      FileChunkDto dto) {
      try {
        var tempDir = fileManager.GetTempDirectoryForResource(ResourceType.ArtWork, id);
        var result = await fileManager.UploadChunk(tempDir, dto);
        if (!string.IsNullOrEmpty(result.FinalUrl)) {
          //move file to final directory of the artwork files
          var fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, id, dto.FileName);
          var fileUrl = await fileManager.MoveObjectAsync(result.FileKey, fileKey);

          var mediaFile = new MediaFile {
            //TODO: uncomment
            //ArtworkId = artwork.Id,
            UploadDate = DateTime.Now.ToUnixTimeSeconds(),
            File = S3File.FromKeyAndUrl(fileKey, fileUrl)
          };

          //TODO: uncomment
          //await db.MediaFiles.AddAsync(mediaFile);
          //var _artwork = await db.ArtWorks.Include(a => a.MediaFiles).FirstOrDefaultAsync(a => a.Id == id);
          //if (_artwork.MediaFiles.Any() && _artwork.FileCount <= _artwork.MediaFiles.Count) {
          //  _artwork.UploadComplete = true;
          //  db.ArtWorks.Update(_artwork);
          //}
          return Ok(fileUrl);
        } else {
          return Ok(result);
        }
      } catch (Exception ex) {
        _logger.LogError(ex, "Failed to upload file");
        throw new ApiException(ApiErrorType.FailedToUploadChunkedFile, $"{ex.Message}");
      }
    }
  }

  public class Test1 {
    public string Name { get; set; }
    public int Age { get; set; }
  }
}