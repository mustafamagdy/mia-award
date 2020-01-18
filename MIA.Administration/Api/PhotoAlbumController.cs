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

namespace MIA.Administration.Api
{

    //[Authorize]
    [EnableCors(CorsPolicyName.AllowAll)]
    [Route("api/photoAlbums")]
    public class PhotoAlbumController : BaseCrudController<PhotoAlbum, PhotoAlbumDto, NewPhotoAlbumDto, UpdatePhotoAlbumDto>
    {
        private readonly IHostingEnvironment env;
        private readonly IOptions<UploadLimits> limitOptions;

        public PhotoAlbumController(
              IMapper mapper,
              ILogger<PhotoAlbumController> logger,
              IStringLocalizer<PhotoAlbumController> localize,
              IHostingEnvironment env,
              IOptions<UploadLimits> limitOptions
            ) : base(mapper, logger, localize)
        {
            this.env = env;
            this.limitOptions = limitOptions;
        }

        public override async Task<IActionResult> SaveNewAsync([FromForm] NewPhotoAlbumDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.SaveNewAsync(dto, db);
            var resultDto = ((PhotoAlbumDto)(result as OkObjectResult)?.Value);
            var PhotoAlbumItem = await db.PhotoAlbums.FindAsync(resultDto.Id);
            PhotoAlbumImage poster = new PhotoAlbumImage();// db.PhotoAlbumImages.FirstOrDefault(a => a.PhotoAlbumId == resultDto.Id);
            if (dto.Poster != null && dto.Poster.Length > 0)
            {
                using (var memorySteam = new MemoryStream())
                {
                    dto.Poster.CopyTo(memorySteam);

                    string validationError = "";
                    if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
                    {
                        return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
                    }

                    if (poster == null)
                    {
                        poster = new PhotoAlbumImage { PhotoAlbumId = resultDto.Id };
                    }

                    poster.Data = memorySteam.ToArray();
                    //delete all images in disk with that Id if exists
                    try
                    {
                        var imageDir = Path.Combine(env.WebRootPath, ImageProxyMiddleware.CACHED_IMAGE_DIR);
                        var files = Directory.GetFiles(imageDir, $"{poster.Id}*");
                        foreach (var file in files)
                        {
                            System.IO.File.Delete(file);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to delete PhotoAlbum images ");
                    }

                    await db.Images.AddAsync(poster);
                }
            }

            return IfFound(_mapper.Map<PhotoAlbumDto>(PhotoAlbumItem));
        }

        public override async Task<IActionResult> UpdateAsync([FromForm] UpdatePhotoAlbumDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.UpdateAsync(dto, db);
            var resultDto = ((PhotoAlbumDto)(result as OkObjectResult)?.Value);
            var PhotoAlbumItem = await db.PhotoAlbums.FindAsync(resultDto.Id);
            PhotoAlbumImage poster = db.PhotoAlbumImages.FirstOrDefault(a => a.PhotoAlbumId == resultDto.Id);
            if (dto.Poster != null && dto.Poster.Length > 0)
            {
                using (var memorySteam = new MemoryStream())
                {
                    dto.Poster.CopyTo(memorySteam);

                    string validationError = "";
                    if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
                    {
                        return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
                    }

                    bool isNew = false;
                    if (poster == null)
                    {
                        poster = new PhotoAlbumImage { PhotoAlbumId = resultDto.Id };
                        isNew = true;
                    }

                    poster.Data = memorySteam.ToArray();
                    //delete all images in disk with that Id if exists
                    try
                    {
                        var imageDir = Path.Combine(env.WebRootPath, ImageProxyMiddleware.CACHED_IMAGE_DIR);
                        var files = Directory.GetFiles(imageDir, $"{poster.Id}*");
                        foreach (var file in files)
                        {
                            System.IO.File.Delete(file);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Failed to delete PhotoAlbum images ");
                    }

                    if (isNew)
                        await db.Images.AddAsync(poster);
                    else
                        db.Images.Update(poster);
                }
            }

            return IfFound(_mapper.Map<PhotoAlbumDto>(PhotoAlbumItem));
        }

    }

}