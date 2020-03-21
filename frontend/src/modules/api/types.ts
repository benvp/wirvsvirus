export interface PagedResult<T> {
  items: T[];
  itemCount: number;
  total: number;
  pageCount: number;
}
