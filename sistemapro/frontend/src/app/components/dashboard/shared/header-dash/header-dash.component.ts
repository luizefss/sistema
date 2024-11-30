import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from "@angular/material/toolbar";


// header-dash.component.ts

@Component({
  selector: 'app-header-dash',
  standalone: true,
  imports: [
    MatBadge,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconButton,
    MatMenuTrigger,
  ],
  template: `
    <mat-toolbar class="header-dashboard">
      <!-- Botão de toggle do menu lateral -->
      <button mat-icon-button (click)="toggleSidebar.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <!-- Título dinâmico da página -->
      <span class="page-title">{{pageTitle}}</span>

      <span class="spacer"></span>

      <!-- Área de ações do usuário -->
      <div class="user-actions">
        <!-- Notificações -->
        <button mat-icon-button [matMenuTriggerFor]="notificationsMenu">
          <mat-icon [matBadge]="notificationCount" matBadgeColor="warn">
            notifications
          </mat-icon>
        </button>

        <!-- Menu de Notificações -->
        <mat-menu #notificationsMenu="matMenu" class="notifications-menu">
          <div class="notification-item" *ngFor="let notification of notifications">
            <mat-icon>{{notification.icon}}</mat-icon>
            <div class="notification-content">
              <strong>{{notification.title}}</strong>
              <p>{{notification.message}}</p>
            </div>
          </div>
        </mat-menu>

        <!-- Perfil do Usuário -->
        <button mat-button [matMenuTriggerFor]="profileMenu" class="profile-button">
          <div class="user-avatar">
            <!-- Iniciais do usuário se não houver avatar -->
            <span *ngIf="!userAvatar">{{userInitials}}</span>
            <img *ngIf="userAvatar" [src]="userAvatar" [alt]="userName">
          </div>
          <span class="user-name">{{userName}}</span>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>

        <!-- Menu do Perfil -->
        <mat-menu #profileMenu="matMenu">
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person</mat-icon>
            <span>Meu Perfil</span>
          </button>
          <button mat-menu-item routerLink="/settings">
            <mat-icon>settings</mat-icon>
            <span>Configurações</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Sair</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-dashboard {
      border-bottom: 1px solid var(--mat-divider-color);
      background: var(--mat-toolbar-container-background-color);
      padding: 0 16px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .profile-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      border-radius: 24px;

      &:hover {
        background: var(--mat-toolbar-container-text-color-lighter);
      }
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mat-primary-color);
      color: white;
      font-size: 14px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .notification-item {
      display: flex;
      padding: 8px 16px;
      gap: 12px;
      align-items: start;

      .notification-content {
        p {
          margin: 4px 0 0;
          font-size: 14px;
          color: var(--mat-gray-600);
        }
      }
    }
  `]
})
export class HeaderDashComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  // Esses valores viriam de um serviço
  pageTitle = 'Dashboard';
  userName = 'Usuário';
  userInitials = 'U';
  userAvatar?: string;
  notificationCount = 3;

  notifications = [
    {
      icon: 'info',
      title: 'Atualização do Sistema',
      message: 'Nova versão disponível'
    }
    // Mais notificações...
  ];

  logout(): void {
    // Implementar lógica de logout
  }
}
