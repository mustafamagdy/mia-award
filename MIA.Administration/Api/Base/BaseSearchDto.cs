using MIA.ORMContext;

namespace MIA.Administration.Api.Base
{
  public class BaseSearchDto : IPagedData
  {
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
  }
  public class BaseSearchIdDto : IPagedData
  {
    public string Id { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
  }
}
