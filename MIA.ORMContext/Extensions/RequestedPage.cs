namespace MIA.ORMContext {
  public interface IPagedData {
    int PageNumber { get; set; }
    int PageSize { get; set; }
  }

  public class RequestedPage : IPagedData {
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
  }

  
}