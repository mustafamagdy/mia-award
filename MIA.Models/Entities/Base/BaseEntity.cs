using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MIA.Models.Entities {

  /// <summary>
  /// Represents the base class for all entities classes
  /// </summary>
  public abstract class BaseEntity : BaseEntity<int> {

  }

  /// <summary>
  /// Represents Generic version of the <see cref="BaseEntity"/>
  /// </summary>
  /// <typeparam name="T"></typeparam>
  public abstract class BaseEntity<T> : IEntity<T> where T : IEquatable<T> {
    public T Id { get; set; }
  }

  /// <summary>
  /// generic interface of the <see cref="IEntity"/>
  /// </summary>
  /// <typeparam name="T"></typeparam>
  public interface IEntity<T> : IEntity where T : IEquatable<T> {
    T Id { get; set; }
  }

  /// <summary>
  /// Base interface for all entities, used for auto mapping, and entity extensions
  /// </summary>
  public interface IEntity { }
}