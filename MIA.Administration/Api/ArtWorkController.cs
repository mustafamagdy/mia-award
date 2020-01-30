using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.Country;
using MIA.Constants;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MIA.Administration.Api {

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/artWorks")]
  public class ArtWorksController : BaseCrudController<ArtWork, ArtWorkDto, NewArtWorkDto, UpdateArtWorkDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;
    private readonly IS3FileManager fileManager;

    public ArtWorksController(
          IMapper mapper,
          ILogger<ArtWorksController> logger,
          IStringLocalizer<ArtWorksController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions,
          IS3FileManager fileManager
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    public override async Task<IActionResult> SaveNewAsync([FromForm] NewArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.ArtWorks.FindAsync(resultDto.Id);
      if (dto.Poster != null && dto.Poster.Length > 0 && dto.Video != null && dto.Video.Length > 0) {

        using (var memorySteam = new MemoryStream()) {
          dto.Poster.CopyTo(memorySteam);

          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }
          if (dto.Payment.Receipt != null && dto.Payment.Receipt.Length > 0) {

            string fileReceiptKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.Payment.Receipt.FileName);
            var ReceiptUrl = await fileManager.UploadFileAsync(dto.Poster.OpenReadStream(), fileReceiptKey);

            ArtWorksItem.Payment.ReceiptUrl = ReceiptUrl;
            ArtWorksItem.Payment.ReceiptId = fileReceiptKey;

          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.Poster.FileName);
          var posterUrl = await fileManager.UploadFileAsync(dto.Poster.OpenReadStream(), fileKey);

          ArtWorksItem.PosterUrl = posterUrl;
          ArtWorksItem.PosterId = fileKey;

          string fileVideoKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.Video.FileName);
          var videoUrl = await fileManager.UploadFileAsync(dto.Video.OpenReadStream(), fileVideoKey);

          ArtWorksItem.TrailerUrl = videoUrl;
          ArtWorksItem.TrailerId = fileVideoKey;
          await db.CommitTransactionAsync();
        }
      }

      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    public override async Task<IActionResult> UpdateAsync([FromForm] UpdateArtWorkDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.ArtWorks.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    [HttpGet("nominees")]
    public async Task<IActionResult> ListOfNominees([FromServices] IAppUnitOfWork db) {
      var nominee = db.Nominees;
      if (nominee == null) {
        return NotFound404("nominee not found");
      }

      return IfFound(nominee.MapTo<ProfileDto>());
    }
    [HttpGet("countries")]
    public IActionResult ListOfCountries() {
      var listCountries = new List<CountryDto>();
      var filename = "iso_countries_all.json";
      if (System.IO.File.Exists("./" + filename)) {
        using (StreamReader r = new StreamReader(filename)) {
          string json = r.ReadToEnd();
          listCountries = JsonConvert.DeserializeObject<List<CountryDto>>(json);

        }
      }
      return IfFound(listCountries.MapTo<CountryDto>());

    }
  }

}