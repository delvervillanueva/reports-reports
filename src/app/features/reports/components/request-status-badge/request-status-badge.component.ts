import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RequestStatus } from '../../models/request-item.model';

@Component({
  selector: 'app-request-status-badge', standalone: true,
  template: `<span class="status-badge status-badge--{{ status() }}"><span aria-hidden="true">{{ icon() }}</span> {{ label() }}</span>`,
  styleUrl: './request-status-badge.component.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestStatusBadgeComponent {
  readonly status = input.required<RequestStatus>();
  readonly label = computed(() => ({ approved: 'Aprobado', pending: 'Pendiente', rejected: 'Rechazado' })[this.status()]);
  readonly icon = computed(() => ({ approved: '✓', pending: '◷', rejected: '⊘' })[this.status()]);
}
