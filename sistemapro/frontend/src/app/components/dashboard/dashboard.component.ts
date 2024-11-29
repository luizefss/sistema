// dashboard.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}


@Component({
 selector: 'app-dashboard',
 standalone: true,
 imports: [
   CommonModule,
   MatSidenavModule,
   MatCardModule,
   MatButtonModule,
   MatIconModule,
   RouterModule
 ],
 template: `
    <div class="dashboard-container">
      <mat-sidenav-container>
        <mat-sidenav #sidenav [mode]="'side'" [opened]="true">
          <div class="logo">AutoSys</div>
          <mat-nav-list>
            <a mat-list-item *ngFor="let item of menuItems" [routerLink]="item.route">
              <mat-icon>{{item.icon}}</mat-icon>
              <span>{{item.label}}</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar>
            <button mat-icon-button (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
            <span class="spacer"></span>
            <button mat-icon-button>
              <mat-icon>account_circle</mat-icon>
            </button>
          </mat-toolbar>

          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
 `,
 styles: [`
   .dashboard-container {
     height: 100vh;
     width: 100vw;
   }

   mat-sidenav-container {
     height: 100%;
   }

   mat-sidenav {
     width: 260px;
     background: #1a1c23;
   }

   .content {
     padding: 24px;
     background: #f8fafc;
     height: calc(100vh - 64px);
     overflow-y: auto;
   }

   .stats-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
     gap: 24px;
     margin-bottom: 24px;
   }

   .stat-card {
     display: flex;
     align-items: center;
     padding: 24px;
     border-radius: 12px;
     transition: transform 0.2s;
   }

   .stat-card:hover {
     transform: translateY(-4px);
   }

   .stat-icon {
     background: #e0f2fe;
     color: #0284c7;
     padding: 12px;
     border-radius: 12px;
     margin-right: 16px;
   }

   .stat-icon.success {
     background: #dcfce7;
     color: #16a34a;
   }

   .stat-icon.warning {
     background: #fef3c7;
     color: #d97706;
   }

   .stat-info h3 {
     margin: 0;
     color: #64748b;
     font-size: 14px;
   }

   .stat-value {
     font-size: 24px;
     font-weight: 600;
     margin-top: 4px;
   }

   @media (max-width: 768px) {
     .content {
       padding: 16px;
     }

     .stats-grid {
       grid-template-columns: 1fr;
       gap: 16px;
     }
   }
 `]
})
export class DashboardComponent {}