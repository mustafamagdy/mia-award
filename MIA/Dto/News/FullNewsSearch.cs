using MIA.ORMContext;

namespace MIA.Api {
  public class FullNewsSearch : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string Category { get; set; }
  }


}