import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="reports-header">
      <a class="reports-header__brand" routerLink="/requests" aria-label="Santander Consumer, inicio">
        <span class="reports-header__flame" aria-hidden="true">♨</span>
        <span><strong>Santander</strong><small>Consumer</small></span>
      </a>
      <nav class="reports-header__nav" aria-label="Navegación principal">
        <a href="#" (click)="$event.preventDefault()"><span aria-hidden="true">⌕</span> Búsqueda</a>
        <a class="reports-header__active" routerLink="/requests"><span aria-hidden="true">▤</span><sup>9</sup> Solicitudes</a>
        <span class="reports-header__user"><b>LD</b><strong>Laura Alexandra...</strong></span>
        <button type="button">Cerrar sesión</button>
      </nav>
    </header>
  `,
  styleUrl: './reports-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsHeaderComponent {}
