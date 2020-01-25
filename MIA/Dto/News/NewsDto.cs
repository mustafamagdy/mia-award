using MIA.Models.Entities;

namespace MIA.Api {
  public class NewsDto : BaseDto {
    public string Id { get; set; }
    public LocalizedData Title { get; set; }
    public string Date { get; set; }
    public string PosterUrl { get; set; }
    public string Category { get; set; }
    public bool Featured { get; set; }
  }

  public class FullNewsDto : NewsDto {
    public LocalizedData Body { get; set; }
  }

  public class FullNewsWithCommentsDto : FullNewsDto {
    public UserCommentDto[] Comments { get; set; }
  }

  public class UserCommentDto : BaseDto {
    public int Id { get; set; }
    public string Comment { get; set; }
    public string userFullName { get; set; }
    public string userAvatarUrl { get; set; }
    public string Date { get; set; }
  }
}