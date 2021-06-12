using AutoMapper;
using Microsoft.Extensions.Logging;
using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.Cors;
using MIA.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MIA.ORMContext.Uow;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
using System;
using MIA.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Hosting;
using MIA.Administration.Middlewares;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using Microsoft.EntityFrameworkCore;
using MIA.Mvc.Core;
using MIA.Infrastructure;
using MIA.Exceptions;

namespace MIA.Administration.Api {

  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/news")]
  [Authorize]
  public class NewsController : BaseCrudController<News, NewsDto, NewNewsDto, UpdateNewsDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;
    private readonly IS3FileManager fileManager;

    public NewsController(
          IMapper mapper,
          ILogger<NewsController> logger,
          IStringLocalizer<NewsController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions,
          IS3FileManager fileManager
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    [HasPermission(Permissions.NewsAddNew)]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public override async Task<IActionResult> SaveNewAsync([FromBody] NewNewsDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((NewsDto)(result as OkObjectResult)?.Value);
      var newsItem = await db.News.FindAsync(resultDto.Id);
      if (dto.PosterByte != null && dto.PosterByte.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.PosterByte)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.News, newsItem.Id, dto.PosterFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          newsItem.Poster = S3File.FromKeyAndUrl(fileKey, posterUrl);

          await db.CommitTransactionAsync();
        }
      }

      return IfFound(_mapper.Map<NewsDto>(newsItem));
    }

    [HasPermission(Permissions.NewsEdit)]
    [RequestSizeLimit(1024 * 1024 * 30)]
    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateNewsDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((NewsDto)(result as OkObjectResult)?.Value);
      var newsItem = await db.News.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      if (dto.PosterByte != null && dto.PosterByte.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.PosterByte)) {


          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }
          bool isNew = string.IsNullOrEmpty(newsItem.Poster.FileKey);
          if (!isNew) {
            await fileManager.DeleteFileAsync(newsItem.Poster.FileKey);
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.News, newsItem.Id, dto.PosterFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          newsItem.Poster = S3File.FromKeyAndUrl(fileKey, posterUrl);
        }
      }

      return IfFound(_mapper.Map<NewsDto>(newsItem));
    }

    [HasPermission(Permissions.NewsRead)]
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      var result = await base.GetAsync(id, db);
      var resultDto = ((NewsDto)(result as OkObjectResult)?.Value);
      var newsItem = await db.News.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<NewsDto>(newsItem));
    }

    [HasPermission(Permissions.NewsRemove)]
    public override Task<IActionResult> DeleteAsync(string id, IAppUnitOfWork db) {
      return base.DeleteAsync(id, db);
    }
  }
}