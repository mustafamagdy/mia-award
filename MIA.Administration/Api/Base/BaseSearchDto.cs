using MIA.ORMContext;

namespace MIA.Administration.Api.Base
{
  public class BaseSearchDto : IPagedData
  {
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
  }
}
