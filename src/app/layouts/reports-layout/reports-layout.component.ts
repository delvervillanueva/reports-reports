import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReportsHeaderComponent } from './reports-header.component';

@Component({
  selector: 'app-reports-layout', standalone: true, imports: [RouterOutlet, ReportsHeaderComponent],
  template: '<app-reports-header /><main><router-outlet /></main>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsLayoutComponent {}
