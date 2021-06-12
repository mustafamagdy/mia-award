using System.Collections.Generic;

namespace MIA.Exceptions {

  /// <summary>
  /// Validation summary for validation errors
  /// </summary>
  public interface IValidationSummary {
    /// <summary>
    /// Read-only returning true if only the object under test is valid
    /// </summary>
    bool IsValid { get; }
    /// <summary>
    /// List of validation errors
    /// </summary>
    IEnumerable<IError> Errors { get; }
  }

  /// <summary>
  /// Generic version of <see cref="IValidationSummary"/>
  /// </summary>
  /// <typeparam name="TError"></typeparam>
  public interface IValidationSummary<out TError>
      : IValidationSummary
      where TError : IError {
    /// <summary>
    /// List of custom errors that inherits from <see cref="TError"/>
    /// </summary>
    new IEnumerable<TError> Errors { get; }

  }
}
