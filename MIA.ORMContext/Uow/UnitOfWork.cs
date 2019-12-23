using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Z.EntityFramework.Plus;

namespace MIA.ORMContext.Uow {
  public class UnitOfWork<T> : IUnitOfWork<T> where T : DbContext {
    protected readonly DbContext Context;
    private readonly IAuditUser _auditUser;
    private IDbContextTransaction _transaction;
    private IsolationLevel? _isolationLevel;

    public UnitOfWork(T dbContext, IAuditUser auditUser) {
      Context = dbContext ??
        throw new ArgumentNullException(nameof(dbContext));
      this._auditUser = auditUser;
    }

    private async Task StartNewTransactionIfNeededAsync() {
      if (_transaction == null) {
        if (_isolationLevel.HasValue) {
          _transaction = await Context.Database.BeginTransactionAsync(_isolationLevel.GetValueOrDefault());
        } else {
          _transaction = Context.Database.BeginTransaction();
        }
      }
    }

    public async Task ForceBeginTransactionAsync() {
      await StartNewTransactionIfNeededAsync();
    }

    public async Task CommitTransactionAsync() {
      var audit = new Audit();
      audit.CreatedBy = _auditUser?.CurrentUsername();

      //do not open transaction here, because if during the request
      //nothing was changed (only select queries were run), we don't
      //want to open and commit an empty transaction - calling SaveChanges()
      //on _transactionProvider will not send any sql to database in such case
      await Context.SaveChangesAsync(audit);

      if (_transaction != null) {
        _transaction.Commit();

        _transaction.Dispose();
        _transaction = null;
      }
    }

    public bool HasATransaction => _transaction != null;

    public void RollbackTransaction() {
      if (_transaction == null) {
        return;
      }

      _transaction.Rollback();

      _transaction.Dispose();
      _transaction = null;
    }

    public async Task<int> SaveChangesAsync() {
      await StartNewTransactionIfNeededAsync();

      return await Context.SaveChangesAsync();
    }

    public void SetIsolationLevel(IsolationLevel isolationLevel) {
      _isolationLevel = isolationLevel;
    }

    public void Dispose() {
      if (_transaction != null) {
        _transaction.Dispose();
      }

      _transaction = null;
    }

  }
}