import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PaginationState } from '../models/pagination.model';
import { RequestItem, RequestSort } from '../models/request-item.model';
import { RequestsQuery } from '../models/request-query.model';
import { RequestsApiService } from '../services/requests-api.service';

@Injectable()
export class RequestsStateService {
  private readonly api = inject(RequestsApiService);
  readonly requests = signal<RequestItem[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly dniSearch = signal('');
  readonly sort = signal<RequestSort | null>(null);
  readonly pagination = signal<PaginationState>({ page: 1, pageSize: 15, totalItems: 0, totalPages: 0 });
  readonly query = computed<RequestsQuery>(() => ({
    dni: this.dniSearch() || undefined,
    page: this.pagination().page,
    pageSize: this.pagination().pageSize,
    sortField: this.sort()?.field,
    sortDirection: this.sort()?.direction
  }));

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getRequests(this.query()).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: ({ items, totalItems }) => {
        this.requests.set(items);
        this.pagination.update((value) => ({ ...value, totalItems, totalPages: Math.ceil(totalItems / value.pageSize) }));
      },
      error: () => this.error.set('No pudimos cargar las solicitudes. Intenta nuevamente.')
    });
  }

  search(dni: string): void { this.dniSearch.set(dni); this.pagination.update((p) => ({ ...p, page: 1 })); this.load(); }
  changePage(page: number): void { this.pagination.update((p) => ({ ...p, page })); this.load(); }
  changeSort(sort: RequestSort): void { this.sort.set(sort); this.pagination.update((p) => ({ ...p, page: 1 })); this.load(); }
}
