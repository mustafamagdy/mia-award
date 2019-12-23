using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using X.PagedList;

namespace MIA.ORMContext {
  public static class IQueryableExtensions {
    public static IPagedList<T> ToPagedList<T>(this IQueryable<T> superset, RequestedPage page) {
      return superset.ToPagedList(page.PageNumber, page.PageSize);
    }

    public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, ISortOption sort) {
      var sortFn = sort.Direction == SortDirection.Asc ? "OrderBy" : "OrderByDescending";
      var type = typeof(T);
      var p = Expression.Parameter(type, "p");
      var propertyAccess = GetProperty(p, type, sort.SortProperty);
      var orderByExpression = Expression.Lambda(propertyAccess, p);
      var resultExpression = Expression.Call(typeof(Queryable), sortFn, new Type[] { type, propertyAccess.Type },
                                    source.Expression, Expression.Quote(orderByExpression));
      return source.Provider.CreateQuery<T>(resultExpression);
    }

    public static MemberExpression GetProperty(Expression p, Type type, string propPath) {
      var propParts = propPath.Split(".");
      while (propParts.Count() > 1) {
        var properName = propParts[0];
        var prop = GetProperty(p, type, properName);
        var _p = Expression.MakeMemberAccess(p, prop.Member);
        return GetProperty(_p, prop.Type, string.Join('.', propParts.Skip(1)));
      }

      if (!propPath.Contains(".")) {
        var property = type.GetProperty(propPath, BindingFlags.Instance | BindingFlags.Public | BindingFlags.IgnoreCase);
        return Expression.MakeMemberAccess(p, property);
      }

      return null;
    }

  }

  /// <summary>
  /// Validates expression passed to And extension function, to check if it is valid or not necessary
  /// </summary>
  internal class AndExpressionValidator {
    private LambdaExpression _predicate;
    private static ExpressionType[] _supportedTypes =
      new ExpressionType[] { ExpressionType.Equal, ExpressionType.NotEqual, ExpressionType.Call };

    private static string[] _supportedCallExpressions = new string[] { "contains", "any" };
    private AndExpressionVisitor _visitor;

    public AndExpressionValidator(LambdaExpression predicate) {
      _predicate = predicate;
      CheckSupportedTypes();
      _visitor = new AndExpressionVisitor();
    }

    private void CheckSupportedTypes() {
      if (!_supportedTypes.Contains(_predicate.Body.NodeType)) {
        throw new NotSupportedException("only the following expressions are supported " + string.Join('-', _supportedTypes.Select(x => x.ToString())));
      }

      if (_predicate.Body.NodeType == ExpressionType.Call && (!_supportedCallExpressions.Contains(((MethodCallExpression)_predicate.Body).Method.Name.ToLower()))) {
        throw new NotSupportedException("only the following call expressions are supported " + string.Join('-', _supportedCallExpressions.Select(x => x.ToString())));
      }
    }

    public void CheckUnnecessaryUsage() {
      _visitor.Visit(_predicate);
    }

    private class AndExpressionVisitor : ExpressionVisitor {

      protected override Expression VisitConstant(ConstantExpression node) {
        var type = node.Value.GetType();
        if (!CanBeNull(type)) {
          throw new ArgumentException("value of type " + type.ToString() + " is not reverence type or nullable");
        }
        return node;
      }

      protected override Expression VisitBinary(BinaryExpression node) {
        var type = node.Right.Type;
        if (node.Right.NodeType != ExpressionType.Constant || !CanBeNull(type)) {
          throw new ArgumentException("please use And extensions only with nullable and reference types");
        }
        return node;
      }

      protected override Expression VisitMethodCall(MethodCallExpression node) {
        //skip the first argument, as it is the generic type of the method (.Any<>())
        var args = node.Arguments.Skip(1).ToList();

        if (args.Count > 0 && args.All(x => x.NodeType != ExpressionType.Constant || !CanBeNull(x.Type))) {
          throw new ArgumentException("please use And extensions only with nullable and reference types");
        }

        //x => x.Any(a => a.Id == 5)
        if (node is MethodCallExpression && (node as MethodCallExpression).Method.Name.ToLower() == "any") {
          Visit(node.Arguments[1]);
          return node;
        }

        if (node is MethodCallExpression && (node as MethodCallExpression).Method.Name.ToLower() == "contains") {
          Visit(node.Arguments[0]);
          return node;
        }

        if (args.Any(x => x.NodeType != ExpressionType.MemberAccess || x.NodeType != ExpressionType.Constant)) {
          throw new ArgumentException("args for " + (node as MethodCallExpression).Method.Name + " has unsupported argument type");
        }

        return node;
      }

      private bool CanBeNull(Type type) {
        bool allowNull = !type.IsValueType || Nullable.GetUnderlyingType(type) != null;
        return allowNull;
      }
    }

  }
  public static class ExpressionExtensions {
    public static IQueryable<T> And<T>(this IQueryable<T> source, Expression<Func<T, bool>> predicate) {
      //Validates unnecessary usage of And extension
      AndExpressionValidator validator = new AndExpressionValidator(predicate);
      validator.CheckUnnecessaryUsage();

      Expression body = predicate.Body;
      while (body != null && body.NodeType == ExpressionType.Call) {
        var method = (body as MethodCallExpression);
        if (method.Method.Name == "Contains") {
          //how to cache this in delegate ?!
          var invokeResult = Expression.Lambda<Func<string>>(method.Arguments.Last()).Compile().Invoke();

          if (invokeResult != null && !string.IsNullOrWhiteSpace(invokeResult.ToString()))
            return source.Where(predicate);
          else
            return source;
        } else if (method.Method.Name == "Any" && method.Arguments.Count() > 0) {
          body = ((LambdaExpression)method.Arguments[1]).Body;
        }
      }

      if (predicate.Body != null && predicate.Body is BinaryExpression) {
        var cond = predicate.Body as BinaryExpression;
        if (cond.NodeType == ExpressionType.Equal || cond.NodeType == ExpressionType.NotEqual) {
          var nullable = Expression.Lambda<Func<object>>(Expression.Convert(cond.Right, typeof(object))).Compile().Invoke();

          if (nullable != null)
            return source.Where(predicate);
        }
      }

      return source;
    }
  }

}