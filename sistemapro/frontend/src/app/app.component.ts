import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/shared/layout/footer.component';
import { HeaderComponent } from './components/shared/layout/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header />
   
    <main> <router-outlet></router-outlet></main>

   <app-footer />
    
  `,
})
export class AppComponent {}
