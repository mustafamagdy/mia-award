using MIA.Attrributes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;

namespace MIA.Api {
  public abstract class GoogleReCaptchaModelBase {
    [Required]
    [GoogleReCaptchaValidation]    
    public string ReCaptchaToken { get; set; }
  }
}
