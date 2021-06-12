namespace MIA.ORMContext {
  public enum SortDirection {
    Asc,
    Desc
  }
  public interface ISortOption {
    string SortProperty { get; set; }
    SortDirection Direction { get; set; }
  }
}