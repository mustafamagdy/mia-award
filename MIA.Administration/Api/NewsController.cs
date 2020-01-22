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
using Microsoft.EntityFrameworkCore;
using MIA.Mvc.Core;

namespace MIA.Administration.Api
{

    //[Authorize]
    [EnableCors(CorsPolicyName.AllowAll)]
    [Route("api/news")]
    public class NewsController : BaseCrudController<News, NewsDto, NewNewsDto, UpdateNewsDto>
    {
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
            ) : base(mapper, logger, localize)
        {
            this.env = env;
            this.limitOptions = limitOptions;
            this.fileManager = fileManager;
        }

        public override async Task<IActionResult> SaveNewAsync([FromForm] NewNewsDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.SaveNewAsync(dto, db);
            var resultDto = ((NewsDto)(result as OkObjectResult)?.Value);
            var newsItem = await db.News.FindAsync(resultDto.Id);
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

                    string fileKey = $"news/{newsItem.Id}/{dto.Poster.FileName}";
                    var posterUrl = await fileManager.UploadFile(dto.Poster.OpenReadStream(), fileKey);

                    newsItem.PosterUrl = posterUrl;
                    newsItem.PosterId = fileKey;

                    await db.CommitTransactionAsync();
                }
            }

            return IfFound(_mapper.Map<NewsDto>(newsItem));
        }

        public override async Task<IActionResult> UpdateAsync([FromForm] UpdateNewsDto dto, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.UpdateAsync(dto, db);
            var resultDto = ((NewsDto)(result as OkObjectResult)?.Value);
            var newsItem = await db.News.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
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

                    bool isNew = string.IsNullOrEmpty(newsItem.PosterId);
                    if (!isNew)
                    {
                        await fileManager.DeleteFile(newsItem.PosterId);
                    }

                    string fileKey = $"news/{newsItem.Id}/{dto.Poster.FileName}";
                    var posterUrl = await fileManager.UploadFile(dto.Poster.OpenReadStream(), fileKey);

                    newsItem.PosterUrl = posterUrl;
                    newsItem.PosterId = fileKey;
                }
            }

            return IfFound(_mapper.Map<NewsDto>(newsItem));
        }

        public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db)
        {
            var result = await base.GetAsync(id, db);
            var resultDto = ((NewsDto)(result as OkObjectResult)?.Value);
            var newsItem = await db.News.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
            return IfFound(_mapper.Map<NewsDto>(newsItem));
        }
        //public async Task<IActionResult> ChangeStatus(string id, bool status, [FromServices] IAppUnitOfWork db)
        //{ 
        //    var newsItem = await db.News.FirstOrDefaultAsync(a => a.Id == id);
        //    newsItem.Outdated = status;
        //    var entry = db.Set<News>().Attach(newsItem);
        //    entry.State = EntityState.Modified;
        //    return IfFound(_mapper.Map<NewsDto>(newsItem));
        //}
    }

}