using MIA.ORMContext;

namespace MIA.Api
{
  public class ArtworkFilterDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string Title { get; set; }
    public string Year { get; set; }

  }
}