// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import HomeComponent from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [

  {  
      path: '',
    component: HomeComponent
  }

// Outros setores serão adicionados aqui

  ]

  }


];