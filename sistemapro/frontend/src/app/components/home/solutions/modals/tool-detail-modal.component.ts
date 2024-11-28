// tool-detail-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tool-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="modal-container">
      <!-- Header -->
      <div class="modal-header" [style.borderColor]="data.color">
        <div class="header-content">
          <div class="tool-icon" [style.backgroundColor]="data.color + '15'">
            <mat-icon [style.color]="data.color">{{data.tool.icon}}</mat-icon>
          </div>
          <div class="tool-info">
            <h2>{{data.tool.name}}</h2>
            <p>{{data.tool.description}}</p>
          </div>
          <button mat-icon-button (click)="close()" class="close-btn">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="modal-content">
        <div class="features">
          <h3>Principais Recursos</h3>
          <ul>
            <li *ngFor="let feature of features">
              <mat-icon [style.color]="data.color">check_circle</mat-icon>
              <span>{{feature}}</span>
            </li>
          </ul>
        </div>

        <div class="benefits">
          <h3>Benefícios</h3>
          <ul>
            <li *ngFor="let benefit of benefits">
              <mat-icon [style.color]="data.color">star</mat-icon>
              <span>{{benefit}}</span>
            </li>
          </ul>
        </div>

        <div class="pricing" *ngIf="data.tool.status === 'available'">
          <h3>Investimento</h3>
          <div class="price-cards">
            <div class="price-card">
              <span class="period">Mensal</span>
              <span class="amount">R$ 99,90</span>
            </div>
            <div class="price-card featured">
              <span class="period">Anual</span>
              <span class="amount">R$ 899,00</span>
              <span class="savings">Economia de 25%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button mat-button (click)="close()">Fechar</button>
        <button 
          mat-raised-button 
          [style.backgroundColor]="data.color"
          class="start-trial-btn"
          (click)="startTrial()"
          *ngIf="data.tool.status === 'available'"
        >
          Começar Trial
          <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .modal-container {
      background: var(--modal-bg);
      border-radius: 16px;
      overflow: hidden;
    }

    .modal-header {
      padding: 24px;
      border-bottom: 3px solid;
      background: var(--card-bg);
    }

    .header-content {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      position: relative;
    }

    .tool-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tool-info {
      flex: 1;
      
      h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      p {
        color: var(--text-secondary);
      }
    }

    .close-btn {
      position: absolute;
      right: 0;
      top: 0;
    }

    .modal-content {
      padding: 24px;

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
        margin-bottom: 1rem;
        color: var(--text-primary);
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: var(--text-secondary);

          mat-icon {
            font-size: 20px;
          }
        }
      }
    }

    .features {
      margin-bottom: 24px;
    }

    .benefits {
      margin-bottom: 24px;
    }

    .pricing {
      .price-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      .price-card {
        padding: 16px;
        border-radius: 12px;
        background: var(--bg-secondary);
        text-align: center;

        &.featured {
          background: var(--primary-color);
          color: white;
        }

        .period {
          display: block;
          font-size: 0.875rem;
          margin-bottom: 4px;
        }

        .amount {
          display: block;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .savings {
          font-size: 0.75rem;
          color: #4caf50;
        }
      }
    }

    .modal-footer {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      border-top: 1px solid var(--border-color);
      background: var(--bg-secondary);
    }

    .start-trial-btn {
      color: white !important;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export default class ToolDetailModalComponent {
  features = [
    'Automatização de processos',
    'Integração com sistemas',
    'Relatórios personalizados',
    'Backup automático'
  ];

  benefits = [
    'Economia de tempo',
    'Redução de erros',
    'Maior produtividade',
    'Conformidade garantida'
  ];

  constructor(
    public dialogRef: MatDialogRef<ToolDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  startTrial() {
    this.dialogRef.close('trial');
  }
  
}