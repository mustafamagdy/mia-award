using MIA.ORMContext;

namespace MIA.Administration.Api.Base {
  public class BaseSearchDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
  }
}
