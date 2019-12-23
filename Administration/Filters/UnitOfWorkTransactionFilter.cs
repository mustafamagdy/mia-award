using Administration.Attrributes;
using MIA.ORMContext.Uow;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Administration.Filters
{
  /// <summary>
  /// Apply UOW on every request by starting transaction and commit it if there is no exception
  /// </summary>
  public class UnitOfWorkTransactionFilter : IAsyncActionFilter
  {
    private IUnitOfWork _uow;
    private ILogger<UnitOfWorkTransactionFilter> _logger;

    /// <summary>
    /// Constructor to inject <see cref="IUnitOfWork"/>
    /// </summary>
    /// <param name="uow"></param>
    /// <param name="logger"></param>
    public UnitOfWorkTransactionFilter(IUnitOfWork uow, ILogger<UnitOfWorkTransactionFilter> logger) {
      _uow = uow;
      _logger = logger;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="context"></param>
    /// <param name="next"></param>
    /// <returns></returns>
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next) {
      //check if transaction isolation level was specified for the request and if so, set it in Unit of Work
      ControllerActionDescriptor descriptor = context.ActionDescriptor as ControllerActionDescriptor;
      TransactionIsolationLevelAttribute isolationLevelAttribute = (TransactionIsolationLevelAttribute)descriptor
        .MethodInfo
        .GetCustomAttributes(typeof(TransactionIsolationLevelAttribute), true)
        .ToList()
        .FirstOrDefault();
      if (isolationLevelAttribute != null) {
        _uow.SetIsolationLevel(isolationLevelAttribute.Level);
      }

      try {

        ActionExecutedContext result = await next.Invoke();

        if (result.Exception != null && result.ExceptionHandled == false) {
          _uow.RollbackTransaction();
          _logger.LogError(result.Exception, result.Exception.Message);
        } else {
          try {
            await _uow.CommitTransactionAsync();
          } catch (Exception exTrx) {
            _uow.RollbackTransaction();
            context.Result = null;
            _logger.LogError(exTrx, exTrx.Message);
          }
        }
      } catch (Exception ex) {
        _uow.RollbackTransaction();
        _logger.LogError(ex, ex.Message);
      }
    }
  }
}