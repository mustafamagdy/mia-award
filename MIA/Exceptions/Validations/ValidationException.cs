using System;

namespace MIA.Exceptions {

  /// <summary>
  /// All data validation exceptions should inherit from this
  /// </summary>
  public class ValidationException : ApiException {
    /// <summary>
    /// Validation result retuned from the server
    /// </summary>
    public IValidationSummary ValidationResult { get; }
    /// <summary>
    /// The entity that is not valid
    /// </summary>
    public object Entity { get; }

    /// <summary>
    /// Constructor that receives the entity that is invalid, and a validation summary
    /// </summary>
    /// <param name="Entity"></param>
    /// <param name="validationResult"></param>
    public ValidationException(object Entity, IValidationSummary validationResult)
        : base("One or more validation Error; check ValidationResult property for details") {
      this.Entity = Entity;
      ValidationResult = validationResult;
    }
  }
}
