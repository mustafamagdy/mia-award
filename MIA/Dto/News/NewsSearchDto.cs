using MIA.ORMContext;

namespace MIA.Api {
  public class NewsSearchDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
  }
}