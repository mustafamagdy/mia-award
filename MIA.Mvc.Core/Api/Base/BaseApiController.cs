using System.Collections.Generic;
using System.Linq;
using System.Net;
using AutoMapper;
using MIA.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using X.PagedList;

namespace MIA.Api.Base {
  /// <summary>
  /// base controller
  /// </summary>
  [ApiController]
  [Route("api/[controller]")]
  public abstract class BaseApiController<T> : ControllerBase where T : ControllerBase {

    protected readonly IMapper _mapper;
    protected readonly ILogger<T> _logger;

    public BaseApiController([FromServices] ILogger<T> logger, IMapper mapper) {
      this._logger = logger;
      this._mapper = mapper;
    }

    public IActionResult Ok<TResult>(IPagedList<TResult> collection) {
      return Ok(new {
        Items = collection,
        Metadata = collection.GetMetaData()
      });
    }

    public IActionResult IfFound<TResult>(IEnumerable<T> collection) {
      if (collection == null || collection.Count() == 0) {
        throw new ApiException(ApiErrorType.NotFound);
      }
      return Ok(collection);
    }

    public IActionResult IfFound<TResult>(IPagedList<TResult> collection) {
      //Note we check for TotalItemCount not current page count
      if (collection == null || collection.TotalItemCount == 0) {
        throw new ApiException(ApiErrorType.NotFound);
      }

      return Ok(collection);
    }

    public IActionResult IfFound<TResult>(TResult result) {
      if (result == null) {
        throw new ApiException(ApiErrorType.NotFound);
      }

      return Ok(result);
    }
  }
}