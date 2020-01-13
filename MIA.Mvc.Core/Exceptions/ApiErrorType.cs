using System.Net;

namespace MIA.Exceptions {
  public enum ApiErrorType {

    //////////////// System Internals////////////////////////
    [Error("10", HttpStatusCode.InternalServerError, Message = "Database connection test failed")]
    DbConnectionTestFaild,
    [Error("20", HttpStatusCode.InternalServerError, Message = "Internal error")]
    InternalError,
    [Error("30", HttpStatusCode.ServiceUnavailable, Message = "Redis server is not found")]
    RedisNotFound,
    /////////////////////////////////////////////////////////

    ///////////////// Data Validations //////////////////////
    [Error("1001", HttpStatusCode.NotFound, Message = "User not found")]
    UserNotExist,
    [Error("1002", HttpStatusCode.NotFound, Message = "Record not found")]
    RecordNotFound,
    ////////////////////////////////////////////////////////
    ///
    /////////////////////Data access ///////////////////////
    [Error("2000", HttpStatusCode.Conflict, Message = "Concurrency issue in updating entites")]
    DataUpdateException,
    [Error("2001", HttpStatusCode.Conflict, Message = "Entity has relation, and not handled")]
    EntityHasRelations,
    ///////////////////////////////////////////////////////

    /////////////////////Redis and caching ////////////////
    [Error("3000", HttpStatusCode.InternalServerError, Message = "OTA balance issue")]
    OTANotEnoughBalance,
    [Error("3001", HttpStatusCode.BadRequest, Message = "Payment failed")]
    UserPaymentFailed,
    [Error("3002", HttpStatusCode.BadRequest, Message = "Payment not approved")]
    PaymentNotApproved,
    //////////////////////////////////////////////////////

    [Error("4000", HttpStatusCode.BadRequest, Message = "File name is too long")]
    FileNameIsTooLong,
    

  }

}
