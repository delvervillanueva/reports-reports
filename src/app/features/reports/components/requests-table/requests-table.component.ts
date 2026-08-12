import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RequestItem, RequestSort, RequestSortField } from '../../models/request-item.model';
import { RequestStatusBadgeComponent } from '../request-status-badge/request-status-badge.component';

@Component({
  selector: 'app-requests-table', standalone: true, imports: [CurrencyPipe, RequestStatusBadgeComponent],
  template: `
    <div class="requests-table__scroll">
      <table>
        <colgroup><col><col><col><col><col></colgroup>
        <thead><tr>
          @for (column of columns; track column.field) {
            <th scope="col"><button type="button" (click)="sort(column.field)" [attr.aria-sort]="ariaSort(column.field)">{{ column.label }} <span aria-hidden="true">↕</span></button></th>
          }
        </tr></thead>
        <tbody>
          @for (request of requests(); track request.id) {
            <tr>
              <td>{{ request.requestDate }}</td><td>{{ request.customerDni }}</td>
              <td>{{ request.transactionAmount | currency:'PEN':'S/ ':'1.2-2' }}</td><td>{{ request.branch }}</td>
              <td><app-request-status-badge [status]="request.status" /></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './requests-table.component.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsTableComponent {
  readonly requests = input.required<RequestItem[]>();
  readonly activeSort = input<RequestSort | null>(null);
  readonly sortChange = output<RequestSort>();
  readonly columns: ReadonlyArray<{ field: RequestSortField; label: string }> = [
    { field: 'requestDate', label: 'Fecha de solicitud' }, { field: 'customerDni', label: 'DNI del cliente' },
    { field: 'transactionAmount', label: 'Monto de transacción' }, { field: 'branch', label: 'Sucursal' },
    { field: 'status', label: 'Estado de solicitud' }
  ];
  sort(field: RequestSortField): void { const direction = this.activeSort()?.field === field && this.activeSort()?.direction === 'asc' ? 'desc' : 'asc'; this.sortChange.emit({ field, direction }); }
  ariaSort(field: RequestSortField): string { return this.activeSort()?.field === field ? (this.activeSort()!.direction === 'asc' ? 'ascending' : 'descending') : 'none'; }
}
