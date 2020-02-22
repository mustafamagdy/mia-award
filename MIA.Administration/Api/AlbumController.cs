﻿using AutoMapper;
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

namespace MIA.Administration.Api
{

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/albums")]
  public class AlbumController : BaseCrudController<Album, PhotoAlbumDto, NewPhotoAlbumDto, UpdatePhotoAlbumDto>
  {
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
        ) : base(mapper, logger, localize)
    {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    public override async Task<IActionResult> Search([FromBody] BaseSearchDto dto, [FromServices] IAppUnitOfWork db)
    {

      var result = db.Albums
                   .Include(a => a.MediaItems)
                   .ProjectTo<PhotoAlbumDto>(_mapper.ConfigurationProvider)
                   .ToPagedList(dto);

      return IfFound(result);

    }

    public override async Task<IActionResult> SaveNewAsync(
      [FromBody] NewPhotoAlbumDto dto,
      [FromServices] IAppUnitOfWork db)
    {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((PhotoAlbumDto)(result as OkObjectResult)?.Value);
      var album = await db.Albums.FindAsync(resultDto.Id);
      int order = 1;
      var albumItems = new List<AlbumItem>();
      foreach (var file in dto.Files)
      {
        if (file != null)//&& file.Length > 0)
        {
          using (var memorySteam = new MemoryStream(file.Media))
          {
            // file.CopyTo(memorySteam);

            string validationError = "";
            if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
            {
              return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
            }

            string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, album.Id, file.MediaFileName);
            var fileUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

            var albumItem = new AlbumItem
            {
              FileKey = fileKey,
              FileUrl = fileUrl,
              MediaType = GetMediaType(file.MediaFileName),
              AlbumId = album.Id,
              Order = order++
            };
            albumItems.Add(albumItem);
          };
        }
      }

      await db.AlbumItems.AddRangeAsync(albumItems);
      return IfFound(_mapper.Map<PhotoAlbumDto>(album));
    }

    private MediaType GetMediaType(string fileName)
    {
      //todo
      return MediaType.Image;
    }

    public override async Task<IActionResult> UpdateAsync([FromBody] UpdatePhotoAlbumDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((PhotoAlbumDto)(result as OkObjectResult)?.Value);
      var album = await db.Albums
        .Include(a => a.MediaItems)
         .FirstOrDefaultAsync(a => a.Id == resultDto.Id);

      //var albumItems = new List<AlbumItem>();
      //foreach (var file in dto.DeleteFiles)
      //{
      //  var mediaItem = album.MediaItems.FirstOrDefault(a => a.FileKey == file);
      //  if (mediaItem != null)
      //  {
      //    await fileManager.DeleteFileAsync(file);
      //    db.AlbumItems.Remove(mediaItem);
      //  }
      //}

      //var maxOrder = album.MediaItems.DefaultIfEmpty().Max(a => a.Order);

      //if (dto.NewFiles != null)
      //{
      //  foreach (var file in dto.NewFiles)
      //  {
      //    if (file != null)//&& file.Length > 0)
      //    {
      //      using (var memorySteam = new MemoryStream(file.Media))
      //      {
      //        //  file.CopyTo(memorySteam);

      //        string validationError = "";
      //        if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
      //        {
      //          return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
      //        }

      //        string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, album.Id, file.MediaFileName);
      //        var fileUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

      //        var albumItem = new AlbumItem
      //        {
      //          FileKey = fileKey,
      //          FileUrl = fileUrl,
      //          MediaType = GetMediaType(file.MediaFileName),
      //          AlbumId = album.Id,
      //          Order = maxOrder++
      //        };

      //        albumItems.Add(albumItem);
      //      };
      //    }
      //  }
      //}

      //  await db.AlbumItems.AddRangeAsync(albumItems);
      return IfFound(_mapper.Map<PhotoAlbumDto>(album));
    }

    [HttpGet("getMediaItems")]
    public async Task<IActionResult> GetMediaItemsAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db)
    {
      var albumItems = db.AlbumItems.Where(a => a.AlbumId == id).ToList();
      var returnAlbumItems = _mapper.Map<List<PhotoAlbumFileDto>>(albumItems);
      return IfFound(returnAlbumItems);

    }
    [HttpPost("createMediaItems")]
    public async Task<IActionResult> CreateMediaItemsAsync([FromBody] NewMediasDto dto, [FromServices] IAppUnitOfWork db)
    {
      var mediaItem = db.AlbumItems.Where(a => a.Id == dto.AlbumId);
      string filePosterKey = String.Empty;
      var filePosterUrl = "";
      var maxOrder = mediaItem.DefaultIfEmpty().Max(a => a.Order);
      if (dto.Media != null)
      {
        using (var memorySteam = new MemoryStream(dto.Media))
        {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
          {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, dto.AlbumId, dto.MediaFileName);
          var fileUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          if (dto.Poster != null)
          {
            using (var memorySteamPoster = new MemoryStream(dto.Poster))
            {
              string validationPosterError = "";
              if (memorySteamPoster.ValidateImage(limitOptions.Value, out validationError) == false)
              {
                return ValidationError(System.Net.HttpStatusCode.BadRequest, validationPosterError);
              }

              filePosterKey = fileManager.GenerateFileKeyForResource(ResourceType.Album, dto.AlbumId, dto.PosterFileName);
              filePosterUrl = await fileManager.UploadFileAsync(memorySteamPoster, filePosterKey);

            }
          }

          var albumItem = new AlbumItem
          {
            FileKey = fileKey,
            FileUrl = fileUrl,
            PosterKey = filePosterKey,
            PosterUrl = filePosterUrl,
            MediaType = dto.MediaType,
            Featured = dto.Featured,
            AlbumId = dto.AlbumId,
            Title=dto.Title,
            Order = maxOrder
          };
          db.AlbumItems.Add(albumItem);

        };
      }
      return Ok();

    }
    [HttpDelete("deleteMediaItems")]
    public async Task<IActionResult> DeleteMediaItemsAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db)
    {
      var entity = db.Set<AlbumItem>().FirstOrDefault(a => a.Id == id);
      if (entity == null)
        return NotFound404("record not found");
      //   IS3FileManager.DeleteFileAsync(entity.PosterKey);
      db.Set<AlbumItem>().Remove(entity);
      return IfFound(entity);

    }
    [HttpPut("UpdateMediaItem")]
    public async Task<IActionResult> UpdateMediaItemAsync([FromBody] PhotoAlbumFileDto dto, [FromServices] IAppUnitOfWork db)
    {  
      var mediaItem= await db.AlbumItems.FirstOrDefaultAsync(a => a.Id == dto.Id);
      mediaItem.Featured = dto.Featured;
      mediaItem.Title = dto.Title;
      var entry = db.Set<AlbumItem>().Attach(mediaItem);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();
      return IfFound(_mapper.Map<PhotoAlbumFileDto>(mediaItem));
    }
  }

}