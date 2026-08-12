import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dni-search', standalone: true, imports: [ReactiveFormsModule],
  template: `
    <form class="dni-search" (ngSubmit)="submit()">
      <label for="dni">Buscar DNI</label>
      <div class="dni-search__field">
        <input id="dni" inputmode="numeric" maxlength="8" placeholder="Ingresa un DNI" [formControl]="control">
        <button type="submit" aria-label="Buscar por DNI" [disabled]="loading() || control.invalid"><span aria-hidden="true"></span></button>
      </div>
    </form>
  `,
  styleUrl: './dni-search.component.scss', changeDetection: ChangeDetectionStrategy.OnPush
})
export class DniSearchComponent {
  readonly loading = input(false);
  readonly searched = output<string>();
  readonly control = new FormControl('', { nonNullable: true, validators: [Validators.pattern(/^\d{0,8}$/)] });
  submit(): void { if (this.control.valid) this.searched.emit(this.control.value.trim()); }
}
