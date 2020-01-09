using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using Microsoft.AspNetCore.Cors;
using MIA.Constants;
using System.Threading.Tasks;
using System.Net.Http;
using System.IO;
using System.Net;
using System;
using Boxed.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;

namespace MIA.Administration.Api {
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/video")]
  [EnableCors(CorsPolicyName.AllowAll)]
  public class VideoStreamController : BaseApiController<VideoStreamController> {
    public VideoStreamController(
      [FromServices] IMapper mapper, [FromServices] ILogger<VideoStreamController> logger
    ) : base(logger, mapper) { }

    [HttpGet("play/{ext}/{videoId}")]
    public async Task<IActionResult> Play(
      //HttpResponseMessage
      [FromRoute(Name = "ext")] string videoExtension,
      [FromRoute(Name = "videoId")] string id,
      [FromServices] IHostingEnvironment env,
      [FromServices] IHttpContextAccessor ctxAccessor
      ) {
      var _filename = Path.Combine(env.WebRootPath, Constants.Uploads.MediaTempUploadDir, $"{id}.{videoExtension}");
      var fs = new FileStream(_filename, FileMode.Open, FileAccess.Read);
      return new FileStreamResult(fs, new MediaTypeHeaderValue("video/mp4").MediaType);
    }
  }


  //public class VideoStream {
  //  private readonly string _filename;
  //  private readonly IHostingEnvironment _env;

  //  public VideoStream(IHostingEnvironment env, string filename, string ext) {
  //    this._env = env;
  //    _filename = Path.Combine(_env.WebRootPath, Constants.Uploads.MediaTempUploadDir, $"{filename}.{ext}");
  //  }

  //  public async void WriteToStream(Stream outputStream, HttpContent content, TransportContext context) {
  //    try {
  //      var buffer = new byte[65536];

  //      using (var video = File.Open(_filename, FileMode.Open, FileAccess.Read)) {
  //        var length = (int)video.Length;
  //        var bytesRead = 1;

  //        while (length > 0 && bytesRead > 0) {
  //          bytesRead = video.Read(buffer, 0, Math.Min(length, buffer.Length));
  //          await outputStream.WriteAsync(buffer, 0, bytesRead);
  //          length -= bytesRead;
  //        }
  //      }
  //    } catch (HttpException ex) {
  //      return;
  //    } finally {
  //      outputStream.Close();
  //    }
  //  }
  //}
}