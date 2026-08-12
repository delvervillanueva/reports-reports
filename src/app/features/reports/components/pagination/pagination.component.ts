import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { PaginationState } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination', standalone: true,
  template: `
    <div class="pagination">
      <p>{{ start() }} a {{ end() }} de <strong>{{ state().totalItems.toLocaleString('en-US') }} solicitudes</strong></p>
      <nav aria-label="Paginación">
        <button [disabled]="state().page === 1" (click)="select(state().page - 1)">‹ <span>Anterior</span></button>
        @for (item of pages(); track $index) {
          @if (item === 'ellipsis') { <span class="pagination__ellipsis">···</span> }
          @else { <button class="pagination__page" [class.pagination__page--active]="item === state().page" [attr.aria-current]="item === state().page ? 'page' : null" (click)="select(item)">{{ item }}</button> }
        }
        <button [disabled]="state().page === state().totalPages" (click)="select(state().page + 1)"><span>Siguiente</span> ›</button>
      </nav>
    </div>
  `,
  styleUrl: './pagination.component.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  readonly state = input.required<PaginationState>();
  readonly pageChange = output<number>();
  readonly start = computed(() => this.state().totalItems ? (this.state().page - 1) * this.state().pageSize + 1 : 0);
  readonly end = computed(() => Math.min(this.state().page * this.state().pageSize, this.state().totalItems));
  readonly pages = computed<Array<number | 'ellipsis'>>(() => {
    const { page, totalPages } = this.state();
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
    const values: Array<number | 'ellipsis'> = [1];
    if (page > 3) values.push('ellipsis');
    for (let value = Math.max(2, page - 1); value <= Math.min(totalPages - 1, page + 2); value++) values.push(value);
    if (page < totalPages - 2) values.push('ellipsis');
    values.push(totalPages);
    return values;
  });
  select(page: number): void { if (page > 0 && page <= this.state().totalPages && page !== this.state().page) this.pageChange.emit(page); }
}
