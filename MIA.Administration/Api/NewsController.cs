using AutoMapper;
using Microsoft.Extensions.Logging;
using MIA.Administration.Api.Base;
using MIA.Models.Entities;
using Microsoft.Extensions.Localization;
using Microsoft.AspNetCore.Cors;
using MIA.Constants;
using Microsoft.AspNetCore.Authorization;

namespace MIA.Administration.Api {

  [Authorize]
  [EnableCors(CorsPolicyName.AllowAll)]
  public class NewsController : BaseCrudController<News, NewsDto, NewNewsDto, UpdateNewsDto> {
    public NewsController(
          IMapper mapper,
          ILogger<NewsController> logger,
          IStringLocalizer<NewsController> localize
        ) : base(mapper, logger, localize) { }
  }

}