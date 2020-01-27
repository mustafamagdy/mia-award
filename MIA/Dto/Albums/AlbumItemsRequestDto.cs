using MIA.ORMContext;

namespace MIA.Api {
  public class AlbumItemsRequestDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string Type { get; set; }
  }
}