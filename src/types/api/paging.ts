export interface PagingParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PagingResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
