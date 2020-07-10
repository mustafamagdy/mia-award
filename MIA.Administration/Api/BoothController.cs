using AutoMapper;
using MIA.Administration.Api.Base;
using MIA.Administration.Dto.BoothPayment;
using MIA.Constants;
using MIA.Exceptions;
using MIA.Infrastructure;
using MIA.Infrastructure.Options;
using MIA.Models.Entities;
using MIA.ORMContext;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Threading.Tasks;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Administration.Api {

  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/booths")]
  [Authorize]
  public class BoothsController : BaseCrudController<Booth, BoothsDto, NewBoothsDto, UpdateBoothsDto> {
    private readonly IHostingEnvironment env;
    private readonly IOptions<UploadLimits> limitOptions;
    private readonly IS3FileManager fileManager;

    public BoothsController(
          IMapper mapper,
          ILogger<BoothsController> logger,
          IStringLocalizer<BoothsController> localize,
          IHostingEnvironment env,
          IOptions<UploadLimits> limitOptions,
          IS3FileManager fileManager
        ) : base(mapper, logger, localize) {
      this.env = env;
      this.limitOptions = limitOptions;
      this.fileManager = fileManager;
    }

    [HasPermission(Permissions.BoothRead)]
    public override Task<IActionResult> Search(BaseSearchDto dto, IAppUnitOfWork db) {
      return base.Search(dto, db);
    }

    [HasPermission(Permissions.BoothAddNew)]
    public override async Task<IActionResult> SaveNewAsync([FromBody] NewBoothsDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.SaveNewAsync(dto, db);
      var resultDto = ((BoothsDto)(result as OkObjectResult)?.Value);
      var BoothsItem = await db.Booths.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<BoothsDto>(BoothsItem));
    }

    [HasPermission(Permissions.BoothAddNew)]
    public override async Task<IActionResult> UpdateAsync([FromBody] UpdateBoothsDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await base.UpdateAsync(dto, db);
      var resultDto = ((BoothsDto)(result as OkObjectResult)?.Value);
      var BoothsItem = await db.Booths.FindAsync(resultDto.Id);
      return IfFound(_mapper.Map<BoothsDto>(BoothsItem));
    }

    [HasPermission(Permissions.BoothRead)]
    public override async Task<IActionResult> GetAsync(string id, [FromServices] IAppUnitOfWork db) {
      var result = await base.GetAsync(id, db);
      var resultDto = ((BoothsDto)(result as OkObjectResult)?.Value);
      var boothItem = await db.Booths.FirstOrDefaultAsync(a => a.Id == resultDto.Id);
      return IfFound(_mapper.Map<BoothsDto>(boothItem));
    }


    [HttpPost("createPayment")]
    [HasPermission(Permissions.BoothPayment)]
    public async Task<IActionResult> SavePaymentAsync([FromBody] NewBoothPurchaseDto dto, [FromServices] IAppUnitOfWork db, [FromServices] IUserResolver userResolver) {
      string fileKey, fileUrl;

      _logger.LogInformation("user {0} is add new  booth payment for {1} ", userResolver.CurrentUsername(), dto.ContactName);

      var result = await db.Set<BoothPurchase>().AddAsync(_mapper.Map<BoothPurchase>(dto));
      var paymentItem = await db.BoothPurchases.FindAsync(result.Entity.Id);
      await db.CommitTransactionAsync();

      if (dto.Payment.Receipt != null && dto.Payment.Receipt.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.Payment.Receipt)) {
          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          fileKey = fileManager.GenerateFileKeyForResource(ResourceType.BoothPayment, paymentItem.Id, dto.Payment.ReceiptFileName);
          fileUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);
          paymentItem.Payment.Receipt = S3File.FromKeyAndUrl(fileKey, fileUrl);

        }
      } else {
        paymentItem.Payment.Receipt = S3File.FromKeyAndUrl("", "");
      }


      var entry = db.Set<BoothPurchase>().Attach(paymentItem);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();

      return IfFound(_mapper.Map<BoothPurchaseDto>(paymentItem));
    }

    [HttpPut("updatePayment")]
    [HasPermission(Permissions.BoothPayment)]
    public async Task<IActionResult> UpdatePaymentAsync([FromBody] UpdateBoothPaymentDto dto, [FromServices] IAppUnitOfWork db, [FromServices] IUserResolver userResolver) {
      string fileKey, fileUrl;
      var paymentItem = await db.BoothPayments.FirstOrDefaultAsync(a => a.Id == dto.Id);
      if (paymentItem == null)
        throw new ApiException(ApiErrorType.NotFound, "record not found");

      _logger.LogInformation("user {0} is update booth payment status from {1} to {2}",
        userResolver.CurrentUsername(), paymentItem.PaymentStatus, dto.PaymentStatus);


      paymentItem = (BoothPayment)_mapper.Map(dto, paymentItem, typeof(UpdateBoothPaymentDto), typeof(BoothPayment));

      if (dto.Receipt != null && dto.Receipt.Length > 0) {
        using (var memorySteam = new MemoryStream(dto.Receipt)) {
          //dto.Receipt.CopyTo(memorySteam);

          string validationError = "";
          if (memorySteam.ValidateImage(limitOptions.Value, out validationError) == false) {
            throw new ApiException(ApiErrorType.BadRequest, validationError.MapTo<ErrorResult>());
          }

          fileKey = fileManager.GenerateFileKeyForResource(ResourceType.BoothPayment, paymentItem.Id, dto.ReceiptFileName);
          fileUrl = await fileManager.UploadFileAsync(memorySteam, fileKey);
          paymentItem.Receipt = S3File.FromKeyAndUrl(fileKey, fileUrl);

        }
      } else {
        paymentItem.Receipt = S3File.FromKeyAndUrl("", "");
      }


      var entry = db.Set<BoothPayment>().Attach(paymentItem);
      entry.State = EntityState.Modified;
      await db.CommitTransactionAsync();

      return IfFound(_mapper.Map<BoothPaymentDto>(paymentItem));
    }

    [HttpGet("getPayment")]
    [HasPermission(Permissions.BoothPayment)]
    public async Task<IActionResult> GetPaymentAsync([FromQuery(Name = "id")] string id, [FromServices] IAppUnitOfWork db) {
      var boothItem = await db.BoothPurchases.Include(p => p.Payment).FirstOrDefaultAsync(a => a.Id == id);
      return IfFound(_mapper.Map<BoothPurchaseDto>(boothItem));
    }

    [HttpPut("toggleSellable")]
    [HasPermission(Permissions.BoothChangeStatus)]
    public async Task<IActionResult> ToggleSellable([FromBody] BoothSellableUpdateDto dto, [FromServices] IAppUnitOfWork db) {
      var item = await db.Booths.FirstOrDefaultAsync(a => a.Id == dto.Id);
      item.Sellable = dto.Sellable;

      return IfFound(_mapper.Map<BoothsDto>(item));
    }
  }

}