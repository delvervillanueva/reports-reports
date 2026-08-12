import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../components/error-state/error-state.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { RequestsTableComponent } from '../../components/requests-table/requests-table.component';
import { RequestsToolbarComponent } from '../../components/requests-toolbar/requests-toolbar.component';
import { RequestsExportService } from '../../services/requests-export.service';
import { RequestsStateService } from '../../state/requests-state.service';

@Component({
  selector: 'app-requests-page', standalone: true,
  imports: [RequestsToolbarComponent, RequestsTableComponent, PaginationComponent, EmptyStateComponent, ErrorStateComponent],
  providers: [RequestsStateService],
  template: `
    <section class="requests-page">
      <div class="requests-page__header">
        <h1>Bandeja de solicitudes</h1>
        <app-requests-toolbar [loading]="state.loading()" (searched)="state.search($event)" (exported)="exportRequests()" />
      </div>
      <div class="requests-page__card" [attr.aria-busy]="state.loading()">
        @if (state.loading() && state.requests().length === 0) {
          <div class="requests-page__loading">Cargando solicitudes...</div>
        } @else if (state.error()) {
          <app-error-state [message]="state.error()!" (retry)="state.load()" />
        } @else if (state.requests().length === 0) {
          <app-empty-state />
        } @else {
          <app-requests-table [requests]="state.requests()" [activeSort]="state.sort()" (sortChange)="state.changeSort($event)" />
          <app-pagination [state]="state.pagination()" (pageChange)="state.changePage($event)" />
        }
      </div>
    </section>
  `,
  styleUrl: './requests-page.component.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsPageComponent implements OnInit {
  readonly state = inject(RequestsStateService);
  private readonly exportService = inject(RequestsExportService);
  ngOnInit(): void { this.state.load(); }
  exportRequests(): void { this.exportService.export(this.state.query()); }
}
