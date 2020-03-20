export interface PagingResult<t> {
  items: t[],
  itemCount: number,
  total: number,
  pageCount: number,
}
