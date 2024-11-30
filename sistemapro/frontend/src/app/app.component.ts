import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <!-- Apenas o router-outlet principal -->
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {}
