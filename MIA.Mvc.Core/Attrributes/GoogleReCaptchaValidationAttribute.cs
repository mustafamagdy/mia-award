using AutoMapper.Configuration;
using MIA.Infrastructure.Options;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Http;

namespace MIA.Attrributes {
  public class GoogleReCaptchaValidationAttribute : ValidationAttribute {

    protected override ValidationResult IsValid(object value, ValidationContext validationContext) {
      Lazy<ValidationResult> errorResult = new Lazy<ValidationResult>(() => new ValidationResult("Google reCAPTCHA validation failed", new String[] { validationContext.MemberName }));

      if (value == null || String.IsNullOrWhiteSpace(value.ToString())) {
        return errorResult.Value;
      }

      var reCaptchResponse = value.ToString();

      IOptions<GoogleOptions> googleOptions = (IOptions<GoogleOptions>)validationContext.GetService(typeof(IOptions<GoogleOptions>));

      HttpClient httpClient = new HttpClient();
      var httpResponse = httpClient.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret={googleOptions.Value.GoogleReCaptcha_SecretKey}&response={reCaptchResponse}").Result;
      if (httpResponse.StatusCode != HttpStatusCode.OK) {
        return errorResult.Value;
      }

      String jsonResponse = httpResponse.Content.ReadAsStringAsync().Result;
      dynamic jsonData = JObject.Parse(jsonResponse);
      if (jsonData.success != true.ToString().ToLower()) {
        return errorResult.Value;
      }

      return ValidationResult.Success;

    }
  }
}
