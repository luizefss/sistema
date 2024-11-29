// accounting.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="accounting-container">
      <div class="section-header">
        <h1>Automações Contábeis</h1>
      </div>

      <div class="automation-grid">
        <mat-card class="automation-card" *ngFor="let automation of automations">
          <div class="card-content" [class.active]="automation.active">
            <div class="icon-container">
              <mat-icon>{{automation.icon}}</mat-icon>
            </div>
            <h3>{{automation.name}}</h3>
            <p>{{automation.description}}</p>
            <div class="card-stats">
              <span>
                <mat-icon>schedule</mat-icon>
                {{automation.timesSaved}}h economizadas
              </span>
              <span>
                <mat-icon>loop</mat-icon>
                {{automation.executions}} execuções
              </span>
            </div>
            <button mat-raised-button [color]="automation.active ? 'warn' : 'primary'">
              {{automation.active ? 'Desativar' : 'Ativar'}}
            </button>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .accounting-container {
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      margin-bottom: 24px;
      h1 {
        font-size: 28px;
        font-weight: 600;
        color: #1e293b;
      }
    }

    .automation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    .automation-card {
      border-radius: 16px;
      transition: transform 0.2s, box-shadow 0.2s;
      overflow: hidden;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.1);
      }
    }

    .card-content {
      padding: 24px;
      text-align: center;

      &.active {
        background: linear-gradient(145deg, #f8fafc, #ffffff);
      }
    }

    .icon-container {
      background: #f1f5f9;
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: #0284c7;
      }
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
    }

    p {
      color: #64748b;
      margin: 8px 0 16px;
    }

    .card-stats {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
      font-size: 14px;
      color: #64748b;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
    }
  `]
})
export class AccountingComponent {
  automations = [
    {
      name: 'Importação de Notas',
      description: 'Importação automática de XMLs da NFe',
      icon: 'upload_file',
      timesSaved: 8,
      executions: 156,
      active: true
    },
    {
      name: 'Conciliação Bancária',
      description: 'Conciliação automática de extratos',
      icon: 'account_balance',
      timesSaved: 12,
      executions: 89,
      active: false
    },
    {
      name: 'Folha de Pagamento',
      description: 'Cálculos automáticos da folha',
      icon: 'payments',
      timesSaved: 6,
      executions: 45,
      active: true
    }
  ];
}