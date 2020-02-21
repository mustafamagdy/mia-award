using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using X.PagedList;

namespace MIA.ORMContext {
  public static class IEnumerableExtensions {
    public static IPagedList<T> ToPagedList<T>(this IEnumerable<T> superset, IPagedData page) {
      return superset.ToPagedList(page.PageNumber, page.PageSize);
    }

  }
}