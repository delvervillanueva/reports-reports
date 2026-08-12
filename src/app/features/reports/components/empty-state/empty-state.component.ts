import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-empty-state', standalone: true, template: '<div class="state">No se encontraron solicitudes.</div>', styles: '.state{height:720px;display:grid;place-items:center;background:#fff;color:#767676}', changeDetection: ChangeDetectionStrategy.OnPush })
export class EmptyStateComponent {}
