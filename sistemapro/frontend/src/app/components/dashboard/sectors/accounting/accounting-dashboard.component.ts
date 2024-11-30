// accounting.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

// Componentes compartilhados
import { HeaderDashComponent } from '../../shared/header-dash/header-dash.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

// Componentes de diálogo
import { FooterDashComponent } from '../../shared/footer-dash/footer-dash.component';
import { BackupConfigComponent } from './dialogs/backup-config/backup-config.component';
import { BankReconciliationConfigComponent } from './dialogs/bank-reconciliation-config/bank-reconciliation-config.component';
import { InssSimulatorComponent } from './dialogs/inss-simulator/inss-simulator.component';
import { NfeConfigComponent } from './dialogs/nfe-config/nfe-config.component';
import { TaxConfigComponent } from './dialogs/tax-config/tax-config.component';

@Component({
  selector: 'app-accounting-dashboard',
  standalone: true,
  imports: [
    HeaderDashComponent, // Importando header do dashboard
    FooterDashComponent, // Importando footer do dashboard
    SidebarComponent,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterModule,
  ],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>

      <div class="main-content">
        <!-- Header -->
        <app-header-dash></app-header-dash>

        <!-- Main Content -->
        <div class="content-area">
          <!-- Stats Overview -->
          <div class="stats-grid">
            <mat-card class="stat-card">
              <div class="stat-content">
                <mat-icon color="primary">auto_awesome</mat-icon>
                <div class="stat-info">
                  <h3>Automações Ativas</h3>
                  <div class="stat-value">4/5</div>
                </div>
              </div>
            </mat-card>

            <mat-card class="stat-card">
              <div class="stat-content">
                <mat-icon color="accent">schedule</mat-icon>
                <div class="stat-info">
                  <h3>Tempo Economizado</h3>
                  <div class="stat-value">12h</div>
                </div>
              </div>
            </mat-card>
          </div>

          <!-- Tools Grid -->
          <div class="tools-grid">
            <!-- NFe Import -->
            <mat-card class="tool-card" (click)="openTool('nfe')">
              <mat-icon>description</mat-icon>
              <h3>Importação NFe</h3>
              <p>Importação automática de notas fiscais</p>
              <div class="tool-status active">Ativo</div>
            </mat-card>

            <!-- Bank Reconciliation -->
            <mat-card class="tool-card" (click)="openTool('bank')">
              <mat-icon>account_balance</mat-icon>
              <h3>Conciliação Bancária</h3>
              <p>Conciliação automática de extratos</p>
              <div class="tool-status">Inativo</div>
            </mat-card>

            <!-- Tax Management -->
            <mat-card class="tool-card" (click)="openTool('tax')">
              <mat-icon>receipt_long</mat-icon>
              <h3>Gestão de Impostos</h3>
              <p>Geração e controle de guias</p>
              <div class="tool-status active">Ativo</div>
            </mat-card>

            <!-- Backup -->
            <mat-card class="tool-card" (click)="openTool('backup')">
              <mat-icon>backup</mat-icon>
              <h3>Backup</h3>
              <p>Backup automático de dados</p>
              <div class="tool-status active">Ativo</div>
            </mat-card>

            <!-- INSS Calculator -->
            <mat-card class="tool-card" (click)="openTool('inss')">
              <mat-icon>calculate</mat-icon>
              <h3>Simulador INSS Obra</h3>
              <p>Cálculo de INSS para construção</p>
              <div class="tool-status active">Ativo</div>
            </mat-card>
          </div>
        </div>
        <app-footer-dash />
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-layout {
        display: flex;
        height: 100vh;
        background-color: var(--mat-app-background-color);
      }

      .main-content {
        flex: 1;
        overflow-y: auto;
      }

      .content-area {
        padding: 24px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
        margin-bottom: 24px;
      }

      .stat-card {
        .stat-content {
          display: flex;
          align-items: center;
          padding: 16px;

          mat-icon {
            font-size: 32px;
            width: 32px;
            height: 32px;
            margin-right: 16px;
          }
        }

        .stat-info {
          h3 {
            margin: 0;
            color: var(--mat-gray-700);
            font-size: 14px;
          }

          .stat-value {
            font-size: 24px;
            font-weight: 500;
            margin-top: 4px;
          }
        }
      }

      .tools-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
      }

      .tool-card {
        padding: 24px;
        cursor: pointer;
        transition: transform 0.2s;
        position: relative;
        overflow: hidden;

        &:hover {
          transform: translateY(-4px);
        }

        mat-icon {
          font-size: 32px;
          width: 32px;
          height: 32px;
          margin-bottom: 16px;
          color: var(--mat-primary-color);
        }

        h3 {
          margin: 0 0 8px;
          font-size: 18px;
        }

        p {
          margin: 0;
          color: var(--mat-gray-600);
        }

        .tool-status {
          position: absolute;
          top: 16px;
          right: 16px;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          background-color: var(--mat-gray-100);
          color: var(--mat-gray-600);

          &.active {
            background-color: var(--mat-primary-50);
            color: var(--mat-primary-900);
          }
        }
      }

      @media (max-width: 768px) {
        .content-area {
          padding: 16px;
        }

        .tools-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AccountingDashboardComponent {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  // Método que gerencia a abertura de diferentes ferramentas/modais
  openTool(tool: string): void {
    let dialogRef;
    const dialogConfig = {
      width: '600px',
      disableClose: true,
    };

    switch (tool) {
      case 'nfe':
        dialogRef = this.dialog.open(NfeConfigComponent, dialogConfig);
        break;
      case 'bank':
        dialogRef = this.dialog.open(
          BankReconciliationConfigComponent,
          dialogConfig
        );
        break;
      case 'tax':
        dialogRef = this.dialog.open(TaxConfigComponent, dialogConfig);
        break;
      case 'backup':
        dialogRef = this.dialog.open(BackupConfigComponent, dialogConfig);
        break;
      case 'inss':
        dialogRef = this.dialog.open(InssSimulatorComponent, dialogConfig);
        break;
    }

    // Gerenciamento do resultado do diálogo
    dialogRef?.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Configurações salvas com sucesso!', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}
