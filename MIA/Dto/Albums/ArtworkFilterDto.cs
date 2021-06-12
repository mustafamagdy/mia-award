using MIA.ORMContext;

namespace MIA.Api
{
  public class ArtworkFilterDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string Title { get; set; }
    public string TvChannels { get; set; }
    public string OnlineChannels { get; set; }
    public int Year { get; set; }

  }
}