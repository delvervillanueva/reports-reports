import { RequestSortField, SortDirection } from './request-item.model';
export interface RequestsQuery { dni?: string; page: number; pageSize: number; sortField?: RequestSortField; sortDirection?: SortDirection; }
