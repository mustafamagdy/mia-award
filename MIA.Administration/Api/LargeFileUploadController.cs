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
using MIA.Exceptions;
using System.Linq;

namespace MIA.Administration.Api {
  public class ChunkDto {
    public string FileName { get; set; }
    public IFormFile Chunk { get; set; }
    //public int ChunkIndex { get; set; }
    public int TotalChunks { get; set; }
    public string Ext { get; set; }
  }

  public class ChunkProgressDto {
    public int NextChunkIndex { get; set; }
    public string Status { get; set; }
  }

#if (Versioning)
  [ApiVersion("1.0")]
#endif
  [Route("api/large")]
  [EnableCors(CorsPolicyName.AllowAll)]
  public class LargeFileUploadController : BaseApiController<LargeFileUploadController> {
    const int OS_DIR_MAX_LENGTH = 255;

    /// <summary>
    /// 
    /// </summary>
    /// <param name="mapper"></param>
    /// <param name="logger"></param>
    public LargeFileUploadController(
      [FromServices] IMapper mapper, [FromServices] ILogger<LargeFileUploadController> logger
    ) : base(logger, mapper) { }

    private string GetUploadDir(string dirName, IHostingEnvironment env) {
      dirName = dirName.Replace("/", "_");
      if (dirName.Length > OS_DIR_MAX_LENGTH)
        throw new ApiException(ApiErrorType.FileNameIsTooLong);

      var uploadingDir = Path.Combine(env.WebRootPath, Uploads.MediaTempUploadDir, dirName);
      if (!Directory.Exists(uploadingDir))
        Directory.CreateDirectory(uploadingDir);
      return uploadingDir;
    }

    private int GetMaxChunkIndex(string uploadingDir) {
      var maxCompletedChunk = Directory
       .GetFiles(uploadingDir)
       .Select(a => {
         var fileName = a.Substring(a.LastIndexOf("\\") + 1);
         if (!fileName.EndsWith(".part")) return -1;

         fileName = fileName.Substring(0, fileName.IndexOf(".part"));
         return Convert.ToInt32(fileName);
       })
       .DefaultIfEmpty()
       .Max();

      return maxCompletedChunk;
    }

    [HttpPost("start-index")]
    [EnableCors(CorsPolicyName.AllowAll)]
    public async Task<IActionResult> GetStartChunkIndex(
      [FromBody] string dirName,
      [FromServices] IHostingEnvironment env
      ) {
      var uploadingDir = GetUploadDir(dirName, env);
      var maxCompletedChunk = GetMaxChunkIndex(uploadingDir);
      return Ok(maxCompletedChunk);
    }

    [HttpPost("upload-chunk")]
    //[RequestSizeLimit(1024 * 1024 * 30)]
    [EnableCors(CorsPolicyName.AllowAll)]
    public async Task<IActionResult> SaveFile(
      [FromForm] ChunkDto chunk,
      [FromServices] IHostingEnvironment env
      ) {
      try {
        using (var chunkStream = new MemoryStream()) {
          string status = "";
          chunk.Chunk.CopyTo(chunkStream);
          var uploadingDir = GetUploadDir(chunk.FileName, env);
          var maxCompletedChunk = GetMaxChunkIndex(uploadingDir);
          // Save the chunk file in temporery location with .part extension
          var SaveFilePath = Path.Combine(uploadingDir, $"{++maxCompletedChunk}.part");
          using (var fileStream = new FileStream(SaveFilePath, FileMode.Create, FileAccess.Write, FileShare.None)) {
            chunkStream.WriteTo(fileStream);
            await fileStream.FlushAsync();
            fileStream.Close();
          }
          status = "chunk saved";
          if (maxCompletedChunk == chunk.TotalChunks) {
            //merge all .part files
            await MergeChunkFiles(uploadingDir, $"{chunk.FileName}.{chunk.Ext}");
            status = "file saved";
          }

          return Ok(new ChunkProgressDto { NextChunkIndex = maxCompletedChunk, Status = status });
        }
      } catch (Exception e) {
        return BadRequest(e.Message);
      }
    }

    private async Task MergeChunkFiles(string fullPath, string fileName) {
      var maxFileNumber = GetMaxChunkIndex(fullPath);
      fileName = Path.Combine(fullPath, fileName);
      Func<int, string> _partFileName = (int index) => string.Format(Path.Combine(fullPath, $"{index}.part"));
      if (!System.IO.File.Exists(fileName)) {
        using (var fs = System.IO.File.Create(fileName)) {
          fs.Close();
        }
      }
      using (FileStream stream = new FileStream(fileName, FileMode.Append, FileAccess.Write, FileShare.None)) {
        for (int i = 1; i <= maxFileNumber; i++) {
          using (var partFile = new FileStream(_partFileName(i), FileMode.Open, FileAccess.Read, FileShare.None)) {
            partFile.Seek(0, SeekOrigin.Begin);
            await partFile.CopyToAsync(stream);
          }
        }
      }

      //delete all .part files
      var allParts = Directory.GetFiles(fullPath, "*.part");
      foreach (var part in allParts) {
        System.IO.File.Delete(part);
      }
    }
  }
}