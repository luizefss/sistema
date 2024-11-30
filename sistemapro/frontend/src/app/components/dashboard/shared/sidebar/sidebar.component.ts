// sidebar-dash.component.ts
// sidebar.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

// Interface para o Setor
interface Sector {
  id: string;
  name: string;
}

// Interface para Menu de Automação
interface AutomationMenu {
  name: string;
  icon: string;
  route: string;
  description?: string;
  isActive?: boolean;
}

// Interface para Menu Principal
interface MainMenuItem {
  name: string;
  icon: string;
  route?: string;
  automations?: AutomationMenu[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressBarModule,
  ],
  template: `
    <div class="sidebar-container">
      <!-- Logo e Nome da Empresa -->
      <div class="brand-section">
        <img src="assets/logo.svg" alt="Logo" class="brand-logo" />
        <span class="brand-name">SistemaPro</span>
      </div>

      <mat-divider></mat-divider>

      <!-- Informações do Plano -->
      <div class="plan-info">
        <div class="plan-status">
          <span class="plan-label">{{ userPlan }}</span>
          <span class="plan-usage"
            >{{ usedFeatures }}/{{ totalFeatures }} automações</span
          >
        </div>
        <mat-progress-bar
          [value]="(usedFeatures / totalFeatures) * 100"
          [color]="usedFeatures / totalFeatures > 0.8 ? 'warn' : 'primary'"
        >
        </mat-progress-bar>
      </div>

      <!-- Menu de Navegação -->
      <mat-nav-list>
        <!-- Dashboard -->
        <a mat-list-item routerLink="./overview" routerLinkActive="active">
          <mat-icon matListItemIcon>dashboard</mat-icon>
          <span matListItemTitle>Visão Geral</span>
        </a>

        <!-- Automações - Menu Expansível -->
        <mat-expansion-panel class="nav-expansion-panel">
          <mat-expansion-panel-header>
            <mat-panel-title>
              <mat-icon>auto_awesome</mat-icon>
              <span>Automações</span>
            </mat-panel-title>
          </mat-expansion-panel-header>

          <!-- Lista dinâmica de automações baseada no setor -->
          <mat-nav-list dense *ngFor="let automation of sectorAutomations">
            <a
              mat-list-item
              [routerLink]="automation.route"
              routerLinkActive="active"
            >
              <mat-icon matListItemIcon>{{ automation.icon }}</mat-icon>
              <span matListItemTitle>{{ automation.name }}</span>
            </a>
          </mat-nav-list>
        </mat-expansion-panel>

        <!-- Relatórios -->
        <a mat-list-item routerLink="./reports" routerLinkActive="active">
          <mat-icon matListItemIcon>assessment</mat-icon>
          <span matListItemTitle>Relatórios</span>
        </a>

        <!-- Configurações -->
        <a mat-list-item routerLink="./settings" routerLinkActive="active">
          <mat-icon matListItemIcon>settings</mat-icon>
          <span matListItemTitle>Configurações</span>
        </a>
      </mat-nav-list>

      <!-- Seção inferior -->
      <div class="sidebar-footer">
        <mat-divider></mat-divider>
        <a mat-list-item routerLink="/subscription" class="subscription-link">
          <mat-icon matListItemIcon>card_membership</mat-icon>
          <span matListItemTitle>Minha Assinatura</span>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .sidebar-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: var(--mat-sidenav-container-background-color);
        color: var(--mat-sidenav-container-text-color);
        width: 260px;
      }

      .brand-section {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;

        .brand-logo {
          width: 32px;
          height: 32px;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 500;
        }
      }

      .plan-info {
        padding: 16px;

        .plan-status {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .plan-label {
          font-weight: 500;
        }

        .plan-usage {
          color: var(--mat-gray-600);
        }
      }

      .nav-expansion-panel {
        background: transparent;
        box-shadow: none;

        ::ng-deep .mat-expansion-panel-body {
          padding: 0;
        }

        mat-panel-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
      }

      mat-nav-list {
        padding-top: 8px;

        a {
          margin: 4px 8px;
          border-radius: 8px;
          height: 44px;

          &.active {
            background: var(--mat-primary-lighter);
            color: var(--mat-primary-darker);

            mat-icon {
              color: var(--mat-primary-darker);
            }
          }
        }
      }

      .sidebar-footer {
        margin-top: auto;

        .subscription-link {
          color: var(--mat-primary-color);
        }
      }

      mat-icon {
        margin-right: 12px;
      }
    `,
  ],
})
export class SidebarComponent implements OnInit {
  currentSector: Sector = {
    id: 'accounting',
    name: 'Contabilidade',
  };

  menuItems: MainMenuItem[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: '/accounting',
    },
    {
      name: 'Automações',
      icon: 'auto_awesome',
      automations: [
        {
          name: 'Importação NFe',
          icon: 'description',
          route: '/accounting/nfe',
          description: 'Importação automática de notas fiscais',
          isActive: true,
        },
        {
          name: 'Conciliação Bancária',
          icon: 'account_balance',
          route: '/accounting/bank',
          description: 'Conciliação automática de extratos',
          isActive: true,
        },
      ],
    },
    {
      name: 'Configurações',
      icon: 'settings',
      route: '/accounting/settings',
    },
  ];

  userPlan = 'Plano Básico';
  usedFeatures = 5;
  totalFeatures = 10;
  sectorAutomations =
    this.menuItems.find((item) => item.name === 'Automações')?.automations ||
    [];

  ngOnInit(): void {
    this.loadSectorData();
  }

  private loadSectorData(): void {
    // Aqui você pode carregar dados específicos do setor
    console.log('Carregando dados do setor:', this.currentSector.name);
  }
}
