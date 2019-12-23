using System.Collections.Generic;
using System.Linq;
using System.Net;
using AutoMapper;
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

    /// <summary>
    /// logger to be used for logging 
    /// </summary>
    protected readonly IMapper _mapper;
    protected readonly ILogger<T> _logger;
    /// <summary>
    /// constructor for base class
    /// </summary>
    /// <param name="logger">Controller based logger</param>
    public BaseApiController([FromServices] ILogger<T> logger, IMapper mapper) {
      this._logger = logger;
      this._mapper = mapper;
    }

    /// <summary>
    /// includes metadata for pagedlist as JSON serializer will not
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="collection"></param>
    /// <returns></returns>
    public IActionResult Ok<TResult>(IPagedList<TResult> collection) {
      return Ok(new {
        Items = collection,
        Metadata = collection.GetMetaData()
      });
    }

    /// <summary>
    /// Checks if a collection has any element, if no return not found with no content
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="collection"></param>
    /// <returns></returns>
    public IActionResult IfFound<TResult>(IEnumerable<T> collection) {
      if (collection == null || collection.Count() == 0) {
        return NotFound(System.Net.HttpStatusCode.NoContent);
      }
      return Ok(collection);
    }

    /// <summary>
    /// Checks if collection is empty will rturn 404, otherwise will ok with paged list data
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="collection"></param>
    /// <returns></returns>
    public IActionResult IfFound<TResult>(IPagedList<TResult> collection) {
      //Note we check for TotalItemCount not current page count
      if (collection == null || collection.TotalItemCount == 0) {
        return NotFound(System.Net.HttpStatusCode.NoContent);
      }

      return Ok(collection);
    }

    /// <summary>
    /// Checks if result is not null if null will return 404
    /// </summary>
    /// <typeparam name="TResult"></typeparam>
    /// <param name="result"></param>
    /// <returns></returns>
    public IActionResult IfFound<TResult>(TResult result) {
      if (result == null) {
        return NotFound();
      }

      return Ok(result);
    }

    /// <summary>
    /// Converts <see cref="IdentityError"/> list into <see cref="ValidationProblemDetails"/>
    /// </summary>
    /// <param name="errors"></param>
    /// <returns></returns>
    public IActionResult ValidationError(IEnumerable<IdentityError> errors) {
      Dictionary<string, string[]> stateErrors = errors.ToDictionary(x => x.Code, x => new string[] { x.Description });
      return ValidationProblem(new ValidationProblemDetails(stateErrors));
    }

    /// <summary>
    /// Converts simple string to error object
    /// </summary>
    /// <param name="statusCode"></param>
    /// <param name="error"></param>
    public IActionResult ValidationError(HttpStatusCode statusCode, string error) {
      Dictionary<string, string[]> stateErrors = new Dictionary<string, string[]> { { statusCode.ToString(), new string[] { error } } };
      return ValidationProblem(new ValidationProblemDetails(stateErrors));
    }

    /// <summary>
    /// returns validation errors with 404 status code
    /// </summary>
    /// <param name="error"></param>
    public IActionResult NotFound404(string error) {
      return ValidationError(HttpStatusCode.NotFound, error);
    }

    /// <summary>
    /// returns validation errors with 403 status code
    /// </summary>
    /// <param name="error"></param>
    public IActionResult Forbid403(string error) {
      return ValidationError(HttpStatusCode.Forbidden, error);
    }

    /// <summary>
    /// returns validation errors with 401 status code
    /// </summary>
    /// <param name="error"></param>
    public IActionResult Unauthorized401(string error) {
      return ValidationError(HttpStatusCode.Unauthorized, error);
    }
  }
}