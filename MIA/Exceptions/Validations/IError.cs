namespace MIA.Exceptions {
  /// <summary>
  /// General interface for all kind of errors with a message
  /// </summary>
  public interface IError {
    string ErrorMessage { get; }
  }
}
