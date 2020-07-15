using System.Diagnostics;

namespace System {
  public static class DateExtensions {
    private static readonly DateTime MinDate = new DateTime(1900, 1, 1);
    private static readonly DateTime MaxDate = new DateTime(9999, 12, 31, 23, 59, 59, 999);

    [DebuggerStepThrough]
    public static long ToUnixTimeMilliseconds(this DateTime date) {
      return new DateTimeOffset(date).ToUnixTimeMilliseconds();
    }
    [DebuggerStepThrough]
    public static long ToUnixTimeSeconds(this DateTime date) {
      return new DateTimeOffset(date).ToUnixTimeSeconds();
    }

    [DebuggerStepThrough]
    public static DateTime LocalDateTime(this long utcDateInMilliSeconds) {
      if (utcDateInMilliSeconds.ToString().Length > 10)
        return DateTimeOffset.FromUnixTimeMilliseconds(utcDateInMilliSeconds).LocalDateTime;
      else
        return DateTimeOffset.FromUnixTimeSeconds(utcDateInMilliSeconds).LocalDateTime;
    }

    [DebuggerStepThrough]
    public static DateTime LocalDateTimeFromSeconds(this long utcDateInSeconds) {
      return DateTimeOffset.FromUnixTimeSeconds(utcDateInSeconds).LocalDateTime;
    }

    [DebuggerStepThrough]
    public static DateTime GetYearStart(this DateTime dateInYear) {
      return new DateTime(dateInYear.Year, 1, 1);
    }

    [DebuggerStepThrough]
    public static DateTime GetYearEnd(this DateTime dateInYear) {
      return new DateTime(dateInYear.Year, 12, DateTime.DaysInMonth(dateInYear.Year, 12)).AddDays(1).AddMilliseconds(-10);
    }

    [DebuggerStepThrough]
    public static bool IsValid(this DateTime target) {
      return (target >= MinDate) && (target <= MaxDate);
    }

    [DebuggerStepThrough]
    public static bool IsAfter(this DateTime target, DateTime thisDate) {
      return IsValid(target) && target > thisDate;
    }

    [DebuggerStepThrough]
    public static bool IsBetween(this DateTime date, DateTime from, DateTime to) {
      if (date >= from && date <= to) {

      }
      return date >= from && date <= to;
    }
  }
}