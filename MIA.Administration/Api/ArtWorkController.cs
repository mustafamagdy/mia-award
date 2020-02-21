﻿using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.ArtWorkPayment;
using MIA.Administration.Dto.Country;
using MIA.Administration.Dto.User;
using MIA.Constants;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MIA.Administration.Api
{

  //[Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  [Route("api/artWorks")]
  public class ArtWorksController : BaseCrudController<ArtWork, ArtWorkDto, NewArtWorkDto, UpdateArtWorkDto>
  {
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
        ) : base(mapper, logger, localize)
    {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    public override async Task<IActionResult> SaveNewAsync([FromBody] NewArtWorkDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.ArtWorks.FindAsync(resultDto.Id);
      if (dto.Poster != null && dto.Poster.Length > 0)
      {
        using (var memorySteam = new MemoryStream(dto.Poster))
        {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
          {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          ArtWorksItem.Payment = new ArtWorkPayment();
          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          ArtWorksItem.PosterUrl = posterUrl;
          ArtWorksItem.PosterId = fileKey;
          await db.CommitTransactionAsync();
        }
      }

      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateArtWorkDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var ArtWorksItem = await db.ArtWorks.FindAsync(resultDto.Id);
      if (dto.Poster != null && dto.Poster.Length > 0 && dto.Video != null && dto.Video.Length > 0)
      {

        using (var memorySteam = new MemoryStream(dto.Poster))
        {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
          {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }
          if (dto.Receipt != null && dto.Receipt.Length > 0)
          {

            using (var memorySteamReciept = new MemoryStream(dto.Poster))
            {

              string fileReceiptKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.ReceiptFileName);
              var ReceiptUrl = await fileManager.UploadFileAsync(memorySteamReciept, fileReceiptKey);

              ArtWorksItem.Payment.ReceiptUrl = ReceiptUrl;
              ArtWorksItem.Payment.ReceiptId = fileReceiptKey;
            }
          }
          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          var posterUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);

          ArtWorksItem.PosterUrl = posterUrl;
          ArtWorksItem.PosterId = fileKey;

          string fileVideoKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWork, ArtWorksItem.Id, dto.PosterFileName);
          var videoUrl = await fileManager.UploadFileAsync(memorySteam, fileVideoKey);

          ArtWorksItem.TrailerUrl = videoUrl;
          ArtWorksItem.TrailerId = fileVideoKey;
        }
        await db.CommitTransactionAsync();

      }

      return IfFound(_mapper.Map<ArtWorkDto>(ArtWorksItem));
    }

    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db)
    {
      var result = await base.GetAsync(id, db);
      var resultDto = ((ArtWorkDto)(result as OkObjectResult)?.Value);
      var artWorkItem = await db.ArtWorks.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<ArtWorkDto>(artWorkItem));
    }
    [HttpGet("getPayment")]
    public async Task<IActionResult> GetPaymentAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db)
    {
      var artWorkItem = await db.ArtWorkPayments.FirstOrDefaultAsync(a => a.ArtWorkId == id);
      return IfFound(_mapper.Map<ArtWorkPaymentDto>(artWorkItem));
    }
    [HttpGet("getArtWorkFiles")]
    public async Task<IActionResult> GetArtWorkFilesAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db)
    {
      var artWork = await db.ArtWorks.FirstOrDefaultAsync(a => a.Id == id);
      var artWorkItem = db.MediaFiles.Where(a => a.ArtWorkId == id).ToList();
      if (!artWorkItem.Any())
      {
        var returnMediaList = new List<MediaFileDto>();
        returnMediaList.Add(new MediaFileDto());
        returnMediaList[0].ArtWork = _mapper.Map<ArtWorkDto>(artWork);
        return IfFound(returnMediaList);
      }
      else
      {
        var returnMediaList = _mapper.Map<List<MediaFileDto>>(artWorkItem);
        returnMediaList[0].ArtWork = _mapper.Map<ArtWorkDto>(artWork);
        return IfFound(returnMediaList);

      }

    }
    [HttpPost("createPayment")]
    public async Task<IActionResult> SavePaymentAsync([FromForm] NewArtWorkPaymentDto dto, [FromServices] IAppUnitOfWork db)
    {
      var result = await db.Set<ArtWorkPayment>().AddAsync(_mapper.Map<ArtWorkPayment>(dto));
      // var resultDto = (ArtWorkPaymentDto)(result as OkObjectResult)?.Value;
      var PaymentItem = await db.ArtWorkPayments.FindAsync(result.Entity.Id);
      return IfFound(_mapper.Map<ArtWorkPaymentDto>(PaymentItem));
    }

    [HttpPut("updatePayment")]
    public async Task<IActionResult> UpdatePaymentAsync([FromForm] UpdateArtWorkPaymentDto dto, [FromServices] IAppUnitOfWork db)
    {

      var paymentItem = await db.ArtWorkPayments.FirstOrDefaultAsync(a => a.Id == dto.Id);
      if (paymentItem == null)
        return NotFound404("record not found");
      paymentItem = (ArtWorkPayment)_mapper.Map(dto, paymentItem, typeof(UpdateArtWorkPaymentDto), typeof(ArtWorkPayment));

      if (dto.Receipt != null && dto.Receipt.Length > 0)
      {
        using (var memorySteam = new MemoryStream())
        {
          dto.Receipt.CopyTo(memorySteam);

          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false)
          {
            return ValidationError(System.Net.HttpStatusCode.BadRequest, validationError);
          }

          string fileKey = fileManager.GenerateFileKeyForResource(ResourceType.ArtWrokPayment, paymentItem.Id, dto.Receipt.FileName);
          var posterUrl = await fileManager.UploadFileAsync(dto.Receipt.OpenReadStream(), fileKey);

          paymentItem.ReceiptUrl = posterUrl;
          paymentItem.ReceiptId = fileKey;
          var entry = db.Set<ArtWorkPayment>().Attach(paymentItem);
          entry.State = EntityState.Modified;
          await db.CommitTransactionAsync();
        }
      }



      return IfFound(_mapper.Map<ArtWorkPaymentDto>(paymentItem));
    }


    [HttpGet("nominees")]
    public async Task<IActionResult> ListOfNominees([FromServices] IAppUnitOfWork db)
    {
      var nominee = db.Nominees;
      if (nominee == null)
      {
        return NotFound404("nominee not found");
      }

      return IfFound(nominee.MapTo<NomineeDto>());
    }
    [HttpGet("countries")]
    public IActionResult ListOfCountries()
    {
      var listCountries = new List<CountryDto>();
      var filename = "iso_countries_all.json";
      if (System.IO.File.Exists("./" + filename))
      {
        using (StreamReader r = new StreamReader(filename))
        {
          string json = r.ReadToEnd();
          listCountries = JsonConvert.DeserializeObject<List<CountryDto>>(json);

        }
      }
      return IfFound(listCountries.MapTo<CountryDto>());

    }

    [HttpPost("getJudgeArtWorks")]
    public async Task<IActionResult> GetJudgeArtWorksAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db)
    {
      var listOfArtWork = new List<ArtWorkDto>();
      var judgeAward = await db.JudgeAwards.Where(a => a.JudgeId == id).ToListAsync();
      foreach (var award in judgeAward)
      {
        var artWork = await db.ArtWorks.FirstOrDefaultAsync(a => a.AwardId == award.AwardId && a.UploadComplete);
        if (artWork != null)
          listOfArtWork.Add(_mapper.Map<ArtWorkDto>(artWork));
      }
      return IfFound(listOfArtWork);

    }

  }

}