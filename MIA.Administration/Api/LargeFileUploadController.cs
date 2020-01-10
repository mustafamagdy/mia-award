using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MIA.Api.Base;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;
using MIA.Constants;

namespace MIA.Administration.Api {
  public class ChunkDto {
    public string FileName { get; set; }
    public IFormFile Chunk { get; set; }
    public int ChunkIndex { get; set; }
    public int TotalChunks { get; set; }
    public string Ext { get; set; }
  }
#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/large")]
  [EnableCors(CorsPolicyName.AllowAll)]
  public class LargeFileUploadController : BaseApiController<LargeFileUploadController> {

    /// <summary>
    /// 
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="logger"></param>
    public LargeFileUploadController(
      [FromServices] IMapper mapper, [FromServices] ILogger<LargeFileUploadController> logger
    ) : base(logger, mapper) { }


    [HttpPost("upload-chunk")]
    //[RequestSizeLimit(1024 * 1024 * 30)]
    [EnableCors(CorsPolicyName.AllowAll)]
    public async Task<IActionResult> SaveFile(
      [FromForm] ChunkDto chunk,
      [FromServices] IHostingEnvironment env
      ) {
      try {
        using (var chunkStream = new MemoryStream()) {
          chunk.Chunk.CopyTo(chunkStream);
          var uploadingDir = Path.Combine(env.WebRootPath, Uploads.MediaTempUploadDir);
          // Save the chunk file in temporery location with .part extension
          var SaveFilePath = Path.Combine(uploadingDir, chunk.FileName + ".part");
          if (chunk.ChunkIndex == 0) {
            using (var fileStream = new FileStream(SaveFilePath, FileMode.Create, FileAccess.Write, FileShare.None)) {
              chunkStream.WriteTo(fileStream);
              await fileStream.FlushAsync();
              fileStream.Close();
            }
            return Ok($"file created");
          } else {
            // Merge the current chunk file with previous uploaded chunk files
            await MergeChunkFile(SaveFilePath, chunkStream);
            if (chunk.ChunkIndex == chunk.TotalChunks - 1) {
              var savedFile = Path.Combine(env.WebRootPath, Uploads.MediaTempUploadDir);
              var originalFilePath = Path.Combine(savedFile, chunk.FileName + $".{chunk.Ext}");
              // After all the chunk files completely uploaded, remove the .part extension and move this file into save location
              System.IO.File.Move(SaveFilePath, originalFilePath);
              return Ok("file saved");
            } else {
              return Ok($"chunk {chunk.ChunkIndex}/{chunk.TotalChunks}");
            }
          }
        }
      } catch (Exception e) {
        return BadRequest(e.Message);
      }
    }

    private async Task MergeChunkFile(string fullPath, Stream chunkContent) {
      // Merge the current chunk file with previous uploaded chunk files
      try {
        using (FileStream stream = new FileStream(fullPath, FileMode.Append, FileAccess.Write, FileShare.ReadWrite)) {
          using (chunkContent) {
            chunkContent.Seek(0, SeekOrigin.Begin);
            await chunkContent.CopyToAsync(stream);
          }
        }
      } catch (IOException ex) {
        throw ex;
      }
    }

  }
}