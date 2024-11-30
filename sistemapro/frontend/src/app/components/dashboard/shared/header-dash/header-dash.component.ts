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
      <button mat-icon-button (click)="toggleSidebar.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="page-title">
        <mat-icon class="title-icon">dashboard</mat-icon>
        Dashboard
      </span>

      <span class="spacer"></span>

      <!-- Área de Notificações e Perfil -->
      <div class="header-actions">
        <!-- Notificações -->
        <button
          mat-icon-button
          [matMenuTriggerFor]="notifyMenu"
          class="notify-button"
        >
          <mat-icon [matBadge]="notificationCount" matBadgeColor="warn"
            >notifications</mat-icon
          >
        </button>

        <!-- Menu de Notificações -->
        <mat-menu #notifyMenu="matMenu" class="notification-menu">
          <div class="notification-header">
            <h4>Notificações</h4>
            <button mat-button color="primary">Marcar todas como lidas</button>
          </div>
          <mat-divider></mat-divider>
          <div class="notification-list">
            <div
              *ngFor="let notification of notifications"
              class="notification-item"
            >
              <mat-icon [color]="notification.type || 'default'">{{
                notification.icon
              }}</mat-icon>

              <div class="notification-content">
                <strong>{{ notification.title }}</strong>
                <p>{{ notification.message }}</p>
                <span class="notification-time">{{
                  notification.time || 'Tempo desconhecido'
                }}</span>
              </div>
            </div>
          </div>
        </mat-menu>

        <!-- Perfil do Usuário -->
        <button
          mat-button
          [matMenuTriggerFor]="profileMenu"
          class="profile-button"
        >
          <div class="avatar-container">
            <div class="avatar">LF</div>
          </div>
          <span class="username">Luiz Ferraz</span>
          <mat-icon>arrow_drop_down</mat-icon>
        </button>

        <!-- Menu do Perfil -->
        <mat-menu #profileMenu="matMenu" class="profile-menu">
          <div class="profile-header">
            <div class="avatar">LF</div>
            <div class="user-info">
              <strong>Luiz Ferraz</strong>
              <small>luizemail.com</small>
            </div>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Meu Perfil</span>
          </button>
          <button mat-menu-item>
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
  styles: [
    `
      .header-dashboard {
        background: #1a1c23;
        color: white;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0 16px;
        height: 64px;
      }

      .page-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 20px;
        margin-left: 8px;

        .title-icon {
          color: #0284c7;
        }
      }

      .spacer {
        flex: 1;
      }

      .header-actions {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .notify-button {
        ::ng-deep .mat-badge-content {
          background: #ef4444;
        }
      }

      .profile-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.05);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      .avatar-container {
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #0284c7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }
      }

      .username {
        font-size: 14px;
      }

      // Estilos para os menus
      ::ng-deep {
        .notification-menu {
          min-width: 320px;
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          h4 {
            margin: 0;
            font-weight: 500;
          }
        }

        .notification-item {
          padding: 12px 16px;
          display: flex;
          gap: 12px;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.04);
          }

          .notification-content {
            p {
              margin: 4px 0;
              color: #64748b;
            }

            .notification-time {
              font-size: 12px;
              color: #94a3b8;
            }
          }
        }

        .profile-menu {
          min-width: 240px;
        }

        .profile-header {
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: center;

          .user-info {
            display: flex;
            flex-direction: column;

            small {
              color: #64748b;
            }
          }
        }
      }
    `,
  ],
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
      message: 'Nova versão disponível',
      type: 'info', // Adicionado
      time: '5 minutos atrás', // Adicionado
    },
    {
      icon: 'warning',
      title: 'Manutenção Programada',
      message: 'O sistema estará fora do ar às 2h',
      type: 'warn', // Adicionado
      time: '1 hora atrás', // Adicionado
    },
  ];

  logout(): void {
    // Implementar lógica de logout
  }
}
