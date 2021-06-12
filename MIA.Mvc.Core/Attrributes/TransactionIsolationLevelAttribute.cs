using System;
using System.Data;

namespace MIA.Attrributes {
  /// <summary>
  /// Allow actions to specify <seealso cref="System.Data.IsolationLevel"/> using attributes
  /// </summary>
  [AttributeUsage(AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
  public class TransactionIsolationLevelAttribute : Attribute
  {
    /// <summary>
    /// transaction isolation level
    /// </summary>
    public IsolationLevel Level { get; set; }

    /// <summary>
    /// Constructor to allow user to pass <see cref="IsolationLevel"/>
    /// </summary>
    /// <param name="level"></param>
    public TransactionIsolationLevelAttribute(IsolationLevel level)
    {
      Level = level;
    }
  }
}
