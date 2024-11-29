// header.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
 selector: 'app-header',
 standalone: true,
 imports: [
   CommonModule,
   MatToolbarModule,
   MatIconModule,
   MatButtonModule,
   MatMenuModule,
   MatProgressBarModule
 ],
 template: `
   <mat-toolbar>
     <button mat-icon-button (click)="toggleSidebar.emit()">
       <mat-icon>menu</mat-icon>
     </button>

     <div class="toolbar-spacer"></div>

     <div class="plan-usage">
       <span>Plano Pro ({{usedAutomations}}/{{totalAutomations}} automações)</span>
       <mat-progress-bar 
         mode="determinate" 
         [value]="(usedAutomations/totalAutomations)*100"
         [color]="usedAutomations/totalAutomations > 0.8 ? 'warn' : 'primary'">
       </mat-progress-bar>
     </div>

     <button mat-icon-button (click)="toggleTheme.emit()">
       <mat-icon>{{isDarkTheme ? 'light_mode' : 'dark_mode'}}</mat-icon>
     </button>

     <button mat-icon-button [matMenuTriggerFor]="userMenu" class="avatar-button">
       <div class="avatar">LF</div>
     </button>

     <mat-menu #userMenu="matMenu">
       <div class="user-header" mat-menu-item disabled>
         <strong>Luiz Ferraz</strong>
         <small>Plano Pro</small>
       </div>
       <mat-divider></mat-divider>
       <button mat-menu-item>
         <mat-icon>person</mat-icon>
         <span>Perfil</span>
       </button>
       <button mat-menu-item>
         <mat-icon>settings</mat-icon>
         <span>Configurações</span>
       </button>
       <button mat-menu-item>
         <mat-icon>support</mat-icon>
         <span>Suporte</span>
       </button>
       <mat-divider></mat-divider>
       <button mat-menu-item (click)="logout()">
         <mat-icon>exit_to_app</mat-icon>
         <span>Sair</span>
       </button>
     </mat-menu>
   </mat-toolbar>
 `,
 styles: [`
   mat-toolbar {
     border-bottom: 1px solid rgba(0,0,0,0.1);
     background: var(--surface-color);
     color: var(--text-color);
   }

   .toolbar-spacer {
     flex: 1 1 auto;
   }

   .plan-usage {
     display: flex;
     flex-direction: column;
     margin: 0 24px;
     min-width: 200px;
   }

   .plan-usage span {
     font-size: 12px;
     margin-bottom: 4px;
   }

   .avatar-button {
     margin-left: 8px;
   }

   .avatar {
     width: 32px;
     height: 32px;
     border-radius: 50%;
     background: #1976d2;
     color: white;
     display: flex;
     align-items: center;
     justify-content: center;
     font-size: 14px;
   }

   .user-header {
     display: flex;
     flex-direction: column;
     padding: 8px 16px;
     
     small {
       color: #666;
     }
   }

   @media (max-width: 600px) {
     .plan-usage {
       display: none;
     }
   }
 `]
})
export class HeaderComponent {
 @Output() toggleSidebar = new EventEmitter<void>();
 @Output() toggleTheme = new EventEmitter<void>();
 
 isDarkTheme = false;
 usedAutomations = 8;
 totalAutomations = 10;

 logout() {
   // Implementar lógica de logout
 }
}