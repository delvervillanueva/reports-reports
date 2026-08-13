import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-reports-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './reports-header.component.html',
  styleUrl: './reports-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsHeaderComponent {
  readonly userName = input('Laura Alexandra...');
  readonly userInitials = input('LD');
  readonly requestsCount = input(9);
  readonly logout = output<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
