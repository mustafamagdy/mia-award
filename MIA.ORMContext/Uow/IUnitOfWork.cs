using System.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MIA.ORMContext.Uow {

  public interface IUnitOfWork<T> : IUnitOfWork where T : DbContext { }

  public interface IUnitOfWork {
 
    /// <summary>
    /// Opens a new transaction instantly when being called.
    /// If a transaction is already open, it won't do anything.
    /// Generally, you shouldn't call this method unless you need
    /// to control the exact moment of opening a transaction.
    /// Unit of Work automatically handles opening transactions
    /// in a convenient time.        
    /// </summary>
    Task ForceBeginTransactionAsync();

    /// <summary>
    /// Commits the current transaction (does nothing when none exists).
    /// </summary>
    Task CommitTransactionAsync();

    /// <summary>
    /// Rolls back the current transaction (does nothing when none exists).
    /// </summary>
    void RollbackTransaction();

    bool HasATransaction { get; }

    /// <summary>
    /// Saves changes to database, previously opening a transaction
    /// only when none exists. The transaction is opened with isolation
    /// level set in Unit of Work before calling this method.
    /// </summary>
    Task<int> SaveChangesAsync();

    /// <summary>
    /// Sets the isolation level for new transactions.
    /// </summary>
    /// <param name="isolationLevel"></param>
    void SetIsolationLevel(IsolationLevel isolationLevel);
  }
}