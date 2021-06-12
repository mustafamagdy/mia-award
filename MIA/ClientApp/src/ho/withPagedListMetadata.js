const withPagedListMetadata = state => ({
  ...state,
  firstItemOnPage: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  isFirstPage: true,
  isLastPage: true,
  lastItemOnPage: 1,
  pageCount: 1,
  pageNumber: 1,
  pageSize: 10,
  totalItemCount: 1
});

export default withPagedListMetadata;