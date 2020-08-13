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
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Bogus;
using EPPlus.TableGrid.Core;
using EPPlus.TableGrid.Core.Configurations;
using EPPlus.TableGrid.Core.Configurations.Styles;
using MIA.Authorization.Attributes;
using MIA.Authorization.Entities;
using Microsoft.AspNetCore.Authorization;
using OfficeOpenXml;
using OfficeOpenXml.Style;

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
    [HttpPost("filterBy")]
    public async Task<IActionResult> FilterBy([FromBody] FilterBoothDto dto, [FromServices] IAppUnitOfWork db) {
      var result = await db.Booths
        .Where(a => dto.Code == "" || a.Code.ToLower().Contains(dto.Code.ToLower()))
        .OrderBy(a => a.Code)
        .ProjectTo<BoothsDto>(_mapper.ConfigurationProvider)
        .ToArrayAsync();
      // .ToPagedListAsync(dto);
      return Ok(result);
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

    [HttpGet("report")]
    [AllowAnonymous]
    //[HasPermission(Permissions.ExportBoothReport)]
    public async Task<IActionResult> BoothReport([FromServices] IAppUnitOfWork db) {
      var booths = (await db.Booths
          .Include(a => a.Purchases)
          .ThenInclude(a => a.Payment)
          .ToArrayAsync())
        .Select(a => _mapper.Map<BoothReportDto>(a))
        .OrderBy(a => a.StatusInt)
        .ThenBy(a => a.Code)
        .ToList();

      var gridOptions = GetGridOptions(booths);
      var bytes = Spreadsheet.GenerateTableGrid(gridOptions);
      var stream = new MemoryStream(bytes);
      string fileName = $"booths_{DateTime.Now:yy-MMM-dd}.xls";
      stream.Position = 0;
      return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
    }

    TgOptions<BoothReportDto> GetGridOptions(IEnumerable<BoothReportDto> data) {
      return new TgOptions<BoothReportDto>() {
        Collection = data,
        DefaultColumnOptions = new TgDefaultColumnOptions() {
          AutoWidth = true,
          Style = new TgExcelStyle {
            HorizontalAlignment = ExcelHorizontalAlignment.Center
          },
          HeaderStyle = new TgExcelStyle {
            HorizontalAlignment = ExcelHorizontalAlignment.Center,
            VerticalAlignment = ExcelVerticalAlignment.Center,
            WrapText = true,
            Font = new TgExcelFont() { IsBold = true }
          }
        },
        Columns = new List<TgColumn>()
          {
            new TgColumn<BoothReportDto>()
            {
                Header = "Code",
                Property = it => it.Code,
                Style = new TgExcelStyle() {HorizontalAlignment = ExcelHorizontalAlignment.Right},
                Width = 7,
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Public",
              Property = it => it.Sellable,
              Style = new TgExcelStyle() {HorizontalAlignment = ExcelHorizontalAlignment.Right},
              Width = 7,
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Status",
              Property = it => it.Status,
              Width = 20
            },

            new TgColumn<BoothReportDto>()
            {
                Header = "Booth Price",
                Property = it => it.BoothPrice,
                Width = 16,
                Style = new TgExcelStyle() {HorizontalAlignment = ExcelHorizontalAlignment.Left}
            },
            new TgColumn<BoothReportDto>()
            {
                Header = "Paid Amount",
                Property = it => it.PaidAmount,
                Width = 16,
                Style = new TgExcelStyle() {HorizontalAlignment = ExcelHorizontalAlignment.Left},
                Summary = new TgColumnSummary()
                {
                    AggregateFunction = new AggregateFunction(AggregateFunctionType.Sum),
                    Style = new TgExcelStyle()
                    {
                        Font = new TgExcelFont() {IsBold = true}
                    }
                }
            },
            new TgColumn<BoothReportDto>()
            {
                Header = "Purchase Date",
                Property = it =>  it.PurchaseDate,
                Width = 20,
                Style = new TgExcelStyle()
                {
                    HorizontalAlignment = ExcelHorizontalAlignment.Right
                }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Company Name",
              Property = it =>  it.CompanyName,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Company Phone",
              Property = it =>  it.Phone,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "EMail",
              Property = it =>  it.Email,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Company Fax",
              Property = it =>  it.Fax,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Cell Phone1",
              Property = it =>  it.CellPhone1,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Cell Phone2",
              Property = it =>  it.CellPhone2,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Contact Person Title",
              Property = it =>  it.ContactPersonTitle,
              Width = 10,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },
            new TgColumn<BoothReportDto>()
            {
              Header = "Contact Person",
              Property = it =>  it.ContactPersonName,
              Width = 20,
              Style = new TgExcelStyle()
              {
                HorizontalAlignment = ExcelHorizontalAlignment.Left
              }
            },

        },
        GroupOptions = new TgGroupOptions<BoothReportDto>() {
          GroupingType = GroupingType.GroupHeaderOnColumn,
          GroupingColumn = item => item.Status,
          IsGroupCollapsable = true
        },
        PrintHeaders = true,
        RowNumberColumn = new TgRowNumberColumn(),
        PrintHeaderColumnNumbers = true,
      };
    }
  }

  public class FilterBoothDto : BaseSearchDto {
    public string Code { get; set; }
  }

  public class BoothReportDto {
    public string Code { get; set; }
    public string Sellable { get; set; }
    public int StatusInt { get; set; }
    public string Status { get; set; }
    public decimal BoothPrice { get; set; }


    public string CompanyName { get; set; }
    public string Phone { get; set; }
    public string Fax { get; set; }
    public string ContactPersonName { get; set; }
    public string ContactPersonTitle { get; set; }
    public string CellPhone1 { get; set; }
    public string CellPhone2 { get; set; }
    public string Email { get; set; }
    public decimal PaidAmount { get; set; }
    public string PurchaseDate { get; set; }
  }

}