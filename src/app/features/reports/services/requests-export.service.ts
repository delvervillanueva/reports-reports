import { Injectable } from '@angular/core';
import { RequestsQuery } from '../models/request-query.model';

@Injectable({ providedIn: 'root' })
export class RequestsExportService {
  export(_query: RequestsQuery): void {
    // Integration boundary: connect the backend export endpoint here.
  }
}
