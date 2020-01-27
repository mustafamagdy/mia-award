using AutoMapper;
using Microsoft.Extensions.Logging;
using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.Cors;
using MIA.Constants;
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
using MIA.Mvc.Core;
using MIA.Models.Entities.Enums;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using X.PagedList;
using AutoMapper.QueryableExtensions;
using MIA.ORMContext;
using MIA.Infrastructure;

namespace MIA.Administration.Api {

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/albums")]
  public class AlbumController : BaseCrudController<Album, PhotoAlbumDto, NewPhotoAlbumDto, UpdatePhotoAlbumDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;
    private readonly IS3FileManager fileManager;

    public AlbumController(
          IMapper mapper,
          ILogger<AlbumController> logger,
          IStringLocalizer<AlbumController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions,
          IS3FileManager fileManager
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    public override async Task<IActionResult> Search([FromBody] BaseSearchDto dto, [FromServices] IAppUnitOfWork db) {

      var result = db.Albums
                   .Include(a => a.MediaItems)
                   .ProjectTo<PhotoAlbumDto>(_mapper.ConfigurationProvider)
                   .ToPagedList(dto);

      return IfFound(result);

    }

    public override async Task<IActionResult> SaveNewAsync(
      [FromForm] NewPhotoAlbumDto dto,
      [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((PhotoAlbumDto)(result as OkObjectResult)?.Value);
      var album = await db.Albums.FindAsync(resultDto.Id);
      int order = 1;
      var albumItems = new List<AlbumItem>();
      foreach (var file in dto.Files) {
        if (file != null && file.Length > 0) {
          using (var memorySteam = new MemoryStream()) {
            file.CopyTo(memorySteam);

            string validationError = "";
            if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
              return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
            }

            string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, album.Id, file.FileName);
            var fileUrl = await fileManager.UploadFileAsync(file.OpenReadStream(), fileKey);

            var albumItem = new AlbumItem {
              FileKey = fileKey,
              FileUrl = fileUrl,
              MediaType = GetMediaType(file.FileName),
              AlbumId = album.Id,
              Order = order++
            };

          };
        }
      }

      await db.AlbumItems.AddRangeAsync(albumItems);
      return IfFound(_mapper.Map<PhotoAlbumDto>(album));
    }

    private MediaType GetMediaType(string fileName) {
      //todo
      return MediaType.Image;
    }

    public override async Task<IActionResult> UpdateAsync([FromForm] UpdatePhotoAlbumDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((PhotoAlbumDto)(result as OkObjectResult)?.Value);
      var album = await db.Albums
        .Include(a => a.MediaItems)
        .FirstOrDefaultAsync(a => a.Id == resultDto.Id);

      var albumItems = new List<AlbumItem>();
      foreach (var file in dto.DeleteFiles) {
        var mediaItem = album.MediaItems.FirstOrDefault(a => a.FileKey == file);
        if (mediaItem != null) {
          await fileManager.DeleteFileAsync(file);
          db.AlbumItems.Remove(mediaItem);
        }
      }

      var maxOrder = album.MediaItems.DefaultIfEmpty().Max(a => a.Order);

      if (dto.NewFiles != null) {
        foreach (var file in dto.NewFiles) {
          if (file != null && file.Length > 0) {
            using (var memorySteam = new MemoryStream()) {
              file.CopyTo(memorySteam);

              string validationError = "";
              if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
                return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
              }

              string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, album.Id, file.FileName);
              var fileUrl = await fileManager.UploadFileAsync(file.OpenReadStream(), fileKey);

              var albumItem = new AlbumItem {
                FileKey = fileKey,
                FileUrl = fileUrl,
                MediaType = GetMediaType(file.FileName),
                AlbumId = album.Id,
                Order = maxOrder++
              };

              albumItems.Add(albumItem);
            };
          }
        }
      }

      await db.AlbumItems.AddRangeAsync(albumItems);
      return IfFound(_mapper.Map<PhotoAlbumDto>(album));
    }

  }

}