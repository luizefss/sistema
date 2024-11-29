// sidebar.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
 selector: 'app-sidebar',
 standalone: true,
 imports: [CommonModule, MatListModule, MatIconModule, RouterModule, MatExpansionModule],
 template: `
   <div class="sidebar">
     <div class="logo">
       <img src="assets/logo.png" alt="Logo" />
       <span>AutoSys</span>
     </div>

     <mat-nav-list>
       <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
         <mat-icon>dashboard</mat-icon>
         <span>Dashboard</span>
       </a>

       <mat-expansion-panel class="menu-panel">
         <mat-expansion-panel-header>
           <mat-panel-title>
             <mat-icon>auto_awesome</mat-icon>
             <span>Automações</span>
           </mat-panel-title>
         </mat-expansion-panel-header>

         <mat-nav-list>
           <a mat-list-item routerLink="/automations/law" routerLinkActive="active">
             <mat-icon>gavel</mat-icon>
             <span>Advocacia</span>
           </a>
           <a mat-list-item routerLink="/automations/accounting" routerLinkActive="active">
             <mat-icon>account_balance</mat-icon>
             <span>Contabilidade</span>
           </a>
           <a mat-list-item routerLink="/automations/realestate" routerLinkActive="active">
             <mat-icon>apartment</mat-icon>
             <span>Imobiliária</span>
           </a>
           <a mat-list-item routerLink="/automations/hr" routerLinkActive="active">
             <mat-icon>people</mat-icon>
             <span>RH</span>
           </a>
         </mat-nav-list>
       </mat-expansion-panel>

       <a mat-list-item routerLink="/reports" routerLinkActive="active">
         <mat-icon>assessment</mat-icon>
         <span>Relatórios</span>
       </a>

       <a mat-list-item routerLink="/settings" routerLinkActive="active">
         <mat-icon>settings</mat-icon>
         <span>Configurações</span>
       </a>

       <mat-divider></mat-divider>

       <a mat-list-item routerLink="/subscription" routerLinkActive="active">
         <mat-icon>card_membership</mat-icon>
         <span>Assinatura</span>
       </a>
     </mat-nav-list>
   </div>
 `,
 styles: [`
   .sidebar {
     height: 100%;
     color: #fff;
   }

   .logo {
     padding: 16px;
     display: flex;
     align-items: center;
     gap: 12px;
     border-bottom: 1px solid rgba(255,255,255,0.1);
   }

   .logo img {
     height: 32px;
   }

   .logo span {
     font-size: 20px;
     font-weight: 500;
   }

   mat-nav-list {
     padding: 8px;
   }

   mat-nav-list a {
     height: 48px;
     margin: 4px 0;
     border-radius: 8px;
     color: #cbd5e1;
     transition: all 0.3s ease;
   }

   mat-nav-list a:hover {
     background: rgba(255,255,255,0.1);
   }

   mat-nav-list a.active {
     background: rgba(255,255,255,0.1);
     color: #fff;
   }

   mat-icon {
     margin-right: 12px;
   }

   .menu-panel {
     background: transparent;
     box-shadow: none;
     color: #cbd5e1;
   }

   mat-divider {
     margin: 16px 0;
     border-color: rgba(255,255,255,0.1);
   }
 `]
})
export class SidebarComponent {}