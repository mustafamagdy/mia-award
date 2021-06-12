using System.Collections.Generic;

namespace System {
  public static class EnumeratorExtension {
    public static void ForEach<T>(this IEnumerable<T> source, Action<T> action) {
      foreach (T t in source) {
        action(t);
      }
    }

  }
}