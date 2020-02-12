using System.Collections;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;

namespace System {
  public static class StringExtension {
    private static readonly Regex webUrlExpression = new Regex(@"(http|https)://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?", RegexOptions.Singleline | RegexOptions.Compiled);
    private static readonly Regex emailExpression = new Regex(@"^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$", RegexOptions.Singleline | RegexOptions.Compiled);
    private static readonly Regex stripHtmlExpression = new Regex("<\\S[^><]*>", RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.CultureInvariant | RegexOptions.Compiled);

    private static readonly char[] illegalUrlCharacters = { ';', '/', '\\', '?', ':', '@', '&', '=', '+', '$', ',', '<', '>', '#', '%', '.', '!', '*', '\'', '"', '(', ')', '[', ']', '{', '}', '|', '^', '`', '~', '–', '‘', '’', '“', '”', '»', '«' };

    [DebuggerStepThrough]
    public static bool IsWebUrl(this string target) {
      return !string.IsNullOrEmpty(target) && webUrlExpression.IsMatch(target);
    }

    [DebuggerStepThrough]
    public static bool IsEmail(this string target) {
      return !string.IsNullOrEmpty(target) && emailExpression.IsMatch(target);
    }

    [DebuggerStepThrough]
    public static bool IsNullOrEmpty(this string target) {
      return string.IsNullOrEmpty(target);
    }

    [DebuggerStepThrough]
    public static string FormatWith(this string target, params object[] args) {
      Check.Argument.IsNotEmpty(target, "target");

      return string.Format(target, args);
    }

    public static string GetFileExt(this string fileName) {
      return Path.GetExtension(fileName);
    }
    public static string GetFileNameWithoutExt(this string fileName) {
      return Path.GetFileNameWithoutExtension(fileName);
    }

  }
}
