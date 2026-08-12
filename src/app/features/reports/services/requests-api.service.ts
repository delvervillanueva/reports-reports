import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { RequestsApiResponse } from '../interfaces/requests-api-response.interface';
import { RequestItem } from '../models/request-item.model';
import { RequestsQuery } from '../models/request-query.model';

const DEMO_REQUESTS: RequestItem[] = [
  ['16/10/25 18:10', '76543218', 5000, 'Surquillo', 'approved'],
  ['16/10/25 15:34', '24578934', 3000, 'San Isidro', 'approved'],
  ['16/10/25 14:50', '98765432', 7250, 'Barranco', 'approved'],
  ['15/10/25 10:03', '35791357', 2850, 'Surco 1', 'approved'],
  ['15/10/25 09:41', '86429753', 4100, 'La Molina', 'pending'],
  ['12/10/25 17:35', '13579246', 6500, 'Miraflores', 'pending'],
  ['12/10/25 16:10', '24681357', 3300, 'Lince', 'pending'],
  ['12/10/25 11:28', '97531086', 5750, 'San Borja', 'rejected'],
  ['10/10/25 13:14', '75395184', 1900, 'Jesus Maria', 'rejected'],
  ['10/10/25 09:48', '64280975', 4800, 'Magdalena del Mar', 'rejected'],
  ['09/10/25 16:22', '53124689', 2450, 'Pueblo Libre', 'rejected'],
  ['09/10/25 14:05', '48021635', 5600, 'San Miguel', 'rejected'],
  ['08/10/25 12:47', '91827364', 3900, 'Los Olivos', 'rejected'],
  ['08/10/25 10:19', '67024581', 6200, 'Chorrillos', 'rejected'],
  ['07/10/25 15:33', '32948716', 4350, 'Villa El Salvador', 'rejected']
].map(([requestDate, customerDni, transactionAmount, branch, status], index) => ({
  id: index + 1, requestDate, customerDni, transactionAmount, branch, status
} as RequestItem));

@Injectable({ providedIn: 'root' })
export class RequestsApiService {
  getRequests(query: RequestsQuery): Observable<RequestsApiResponse> {
    let items = query.dni ? DEMO_REQUESTS.filter((item) => item.customerDni.includes(query.dni!)) : [...DEMO_REQUESTS];
    if (query.sortField && query.sortDirection) {
      const factor = query.sortDirection === 'asc' ? 1 : -1;
      items.sort((a, b) => String(a[query.sortField!]).localeCompare(String(b[query.sortField!]), 'es', { numeric: true }) * factor);
    }
    return of({ items, totalItems: query.dni ? items.length : 1233 }).pipe(delay(250));
  }
}
