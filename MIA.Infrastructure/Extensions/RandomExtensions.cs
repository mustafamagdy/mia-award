using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace System {
  public static class RandomExtensions {
    private static Random r = new Random(100);

    [DebuggerStepThrough]
    public static T Random<T>(this IEnumerable<T> source) {
      if (source == null || !source.Any()) return default(T);
      var _r = new Random();
      return source.ToArray()[_r.Next(source.Count())];
    }
    [DebuggerStepThrough]
    public static T RandomFixed<T>(this IEnumerable<T> source) {
      if (source == null || !source.Any()) return default(T);
      return source.ToArray()[r.Next(source.Count())];
    }
    [DebuggerStepThrough]
    public static IEnumerable<T> Random<T>(this IEnumerable<T> source, int count) {
      if (source == null || !source.Any()) yield return default(T); 
      var _r = new Random();
      for (int i = 0; i < count; i++) {
        yield return source.ToArray()[_r.Next(source.Count())];
      }
    }
    [DebuggerStepThrough]
    public static IEnumerable<T> RandomFixed<T>(this IEnumerable<T> source, int count) {
      if (source == null || !source.Any()) yield return default(T);
      for (int i = 0; i < count; i++) {
        yield return source.ToArray()[r.Next(source.Count())];
      }
    }

    [DebuggerStepThrough]
    public static long RandomFutureUtcDate() {
      var _r = new Random();
      return new DateTimeOffset(DateTime.Now.AddDays(_r.Next(100))).ToUnixTimeSeconds();
    }

    [DebuggerStepThrough]
    public static long RandomFutureUtcDateFixed() {
      return new DateTimeOffset(DateTime.Now.AddDays(r.Next(100))).ToUnixTimeSeconds();
    }

    [DebuggerStepThrough]
    public static long RandomPastUtcDate() {
      var _r = new Random();
      return new DateTimeOffset(DateTime.Now.AddDays(-1 * _r.Next(100))).ToUnixTimeSeconds();
    }
    [DebuggerStepThrough]
    public static long RandomPastUtcDateFixed() {
      return new DateTimeOffset(DateTime.Now.AddDays(-1 * r.Next(100))).ToUnixTimeSeconds();
    }
  }

}