using MIA.Administration.Dto.User;

namespace MIA.Administration.Api
{
    public class JudgeCommentDto {
    public string Id { get; set; }
    public string MediaTime { get; set; }
    public string Comments { get; set; }

    public MediaFileDto MediaFile { get; set; }
    public string MediaFileId { get; set; }
    public JudgeDto Judge { get; set; }
    public string JudgeId { get; set; }
  }

}