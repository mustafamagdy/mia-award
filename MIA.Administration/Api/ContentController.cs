using System;
using System.Threading.Tasks;
using AutoMapper;
using MIA.Api.Base;
using MIA.Constants;
using MIA.Exceptions;
using MIA.Models.Entities;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace MIA.Administration.Api {
  [EnableCors(CorsPolicyName.DevOnly)]
  [Route("api/content")]
  [Authorize]
  public class ContentController : BaseApiController<ContentController> {
    public ContentController(ILogger<ContentController> logger, IMapper mapper) : base(logger, mapper) { }

    //[HasPermission(Permissions.NewsRemove)]
    [HttpGet("of-type")]
    public async Task<IActionResult> GetContentOfType([FromRoute] string type, [FromServices] IAppUnitOfWork db) {
      if (Enum.TryParse(typeof(ContentType), type, ignoreCase: true, out object contentType)) {
        var _type = (ContentType)contentType;
        var result = await db.Contents.FirstOrDefaultAsync(a => a.ContentType == _type);
        var deserializedItems = JsonConvert.DeserializeObject<dynamic>(result.Data);
        return Ok(deserializedItems);
      } else {
        throw new ApiException(ApiErrorType.NotFound);
      }
    }

    //[HasPermission(Permissions.NewsRemove)]
    [HttpPut("of-type")]
    public async Task<IActionResult> UpdateContentOfType([FromRoute] string type,
      [FromBody] string content, [FromServices] IAppUnitOfWork db) {
      if (Enum.TryParse(typeof(ContentType), type, ignoreCase: true, out object contentType)) {
        var _type = (ContentType)contentType;
        var result = await db.Contents.FirstOrDefaultAsync(a => a.ContentType == _type);
        try {
          var deserializedItems = JsonConvert.DeserializeObject<dynamic>(content);
          result.Data = content;

        } catch (Exception e) {
          throw new ApiException(ApiErrorType.InternalError, "Failed to deserialize data");
        }

        return Ok();
      } else {
        throw new ApiException(ApiErrorType.NotFound);
      }
    }


  }
}