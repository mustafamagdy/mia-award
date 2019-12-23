namespace System {
  public static class ExceptionExtensions {
    public static string GetInfo(this Exception ex) {
      return "{0} - Trace: {1}".FormatWith(ex.Message, ex.StackTrace);
    }

    public static string FlattenedMessages(this Exception e, string msgs = "") {
      if (e == null) {
        return string.Empty;
      }

      if (msgs == "") {
        msgs = e.Source + " -> " + e.Message + " :: " + e.StackTrace;
      }

      if (e.InnerException != null) {
        msgs += "\r\nInnerException: " + FlattenedMessages(e.InnerException);
      }

      return msgs;
    }
  }
}