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
    [Error("400", HttpStatusCode.BadGateway, Message = "Bad request")]
    BadRequest,
    [Error("401", HttpStatusCode.Unauthorized, Message = "Unauthorized")]
    Unauthorized,
    [Error("403", HttpStatusCode.Forbidden, Message = "Forbidden")]
    Forbidden,
    [Error("404", HttpStatusCode.NotFound, Message = "No data found")]
    NotFound,
    [Error("409", HttpStatusCode.Conflict, Message = "Conflict")]
    Conflict,
    /////////////////////////////////////////////////////////

    ///////////////// Data Validations //////////////////////
    [Error("1001", HttpStatusCode.NotFound, Message = "User not found")]
    UserNotExist,
    [Error("1002", HttpStatusCode.NotFound, Message = "Record not found")]
    RecordNotFound,
    [Error("1003", HttpStatusCode.BadRequest, Message = "Judging has been finished")]
    JudgeFinished,
    [Error("1004", HttpStatusCode.BadRequest, Message = "Validation failed")]
    ValidationFailed,
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
    [Error("4001", HttpStatusCode.BadRequest, Message = "Filed to upload chunked file")]
    FailedToUploadChunkedFile,

  }

}
