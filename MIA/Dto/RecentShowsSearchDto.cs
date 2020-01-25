using MIA.ORMContext;

namespace MIA.Api {
  public class RecentShowsSearchDto : IPagedData {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int? Year { get; set; }
    public string AwardId { get; set; }
    public string CountryId { get; set; }
  }
}