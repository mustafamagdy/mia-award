using MIA.Models.Entities;
using System;
using System.Text;

namespace MIA.Models.Entities {

  public class JudgeComment : BaseEntity<string> {
    public string MediaTime { get; set; }
    public string Comments { get; set; }

    public MediaFile MediaFile { get; set; }
    public string MediaFileId { get; set; }
    public Judge Judge { get; set; }
    public string JudgeId { get; set; }
  }
}
