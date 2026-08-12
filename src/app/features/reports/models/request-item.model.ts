export type RequestStatus = 'approved' | 'pending' | 'rejected';
export type RequestSortField = 'requestDate' | 'customerDni' | 'transactionAmount' | 'branch' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface RequestItem {
  id: number;
  requestDate: string;
  customerDni: string;
  transactionAmount: number;
  branch: string;
  status: RequestStatus;
}

export interface RequestSort { field: RequestSortField; direction: SortDirection; }
