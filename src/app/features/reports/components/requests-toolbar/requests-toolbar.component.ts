import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DniSearchComponent } from '../dni-search/dni-search.component';

@Component({
  selector: 'app-requests-toolbar', standalone: true, imports: [DniSearchComponent],
  template: `<div class="requests-toolbar"><app-dni-search [loading]="loading()" (searched)="searched.emit($event)"/><button type="button" (click)="exported.emit()">Exportar <span aria-hidden="true">⇩</span></button></div>`,
  styles: `.requests-toolbar{display:flex;align-items:flex-end;gap:40px}.requests-toolbar>button{height:48px;border:0;background:transparent;color:var(--color-teal);font-weight:700;font-size:16px;padding:0}.requests-toolbar>button span{margin-left:7px;font-size:22px;font-weight:400}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsToolbarComponent { readonly loading = input(false); readonly searched = output<string>(); readonly exported = output<void>(); }
