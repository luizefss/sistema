// bank-reconciliation-config.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Interface para tipar os dados do banco
interface BankConfig {
  banco: string;
  agencia: string;
  conta: string;
  tipo: 'corrente' | 'poupanca';
  formatoArquivo: 'ofx' | 'csv';
  intervaloAtualizacao: number;
  integracaoSistema: string;
  status: 'ativo' | 'inativo';
}

@Component({
  selector: 'app-bank-reconciliation-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="config-container">
      <h2 mat-dialog-title>
        Configurar Conciliação Bancária
        <span class="status" [class.active]="data.status === 'ativo'">
          {{ data.status === 'ativo' ? 'Ativo' : 'Inativo' }}
        </span>
      </h2>

      <form [formGroup]="bankForm">
        <mat-dialog-content>
          <!-- Dados Bancários -->
          <div class="form-section">
            <h3>Dados da Conta</h3>
            <mat-form-field>
              <mat-label>Banco</mat-label>
              <mat-select formControlName="banco">
                <mat-option *ngFor="let bank of banks" [value]="bank.code">
                  {{ bank.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field>
                <mat-label>Agência</mat-label>
                <input matInput formControlName="agencia" />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Conta</mat-label>
                <input matInput formControlName="conta" />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Tipo</mat-label>
                <mat-select formControlName="tipo">
                  <mat-option value="corrente">Corrente</mat-option>
                  <mat-option value="poupanca">Poupança</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>

          <!-- Configurações -->
          <div class="form-section">
            <h3>Configurações de Importação</h3>
            <mat-form-field>
              <mat-label>Formato do Arquivo</mat-label>
              <mat-select formControlName="formatoArquivo">
                <mat-option value="ofx">OFX</mat-option>
                <mat-option value="csv">CSV</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Intervalo de Atualização</mat-label>
              <mat-select formControlName="intervaloAtualizacao">
                <mat-option [value]="1">A cada 1 hora</mat-option>
                <mat-option [value]="12">A cada 12 horas</mat-option>
                <mat-option [value]="24">Diariamente</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button (click)="close()">Cancelar</button>
          <button
            mat-raised-button
            color="primary"
            (click)="save()"
            [disabled]="!bankForm.valid"
          >
            Salvar
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [
    `
      .config-container {
        padding: 24px;
        max-width: 600px;
      }

      .form-section {
        margin-bottom: 24px;
      }

      .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
      }

      .status {
        font-size: 14px;
        padding: 4px 8px;
        border-radius: 4px;
        margin-left: 8px;

        &.active {
          background: #dcfce7;
          color: #16a34a;
        }
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class BankReconciliationConfigComponent implements OnInit {
  bankForm!: FormGroup;

  // Lista de bancos disponíveis
  banks = [
    { code: '001', name: 'Banco do Brasil' },
    { code: '341', name: 'Itaú' },
    { code: '033', name: 'Santander' },
    { code: '104', name: 'Caixa Econômica' },
    { code: '237', name: 'Bradesco' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BankReconciliationConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BankConfig
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.bankForm.patchValue(this.data);
    }
  }

  private createForm(): void {
    this.bankForm = this.fb.group({
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      tipo: ['corrente', Validators.required],
      formatoArquivo: ['ofx', Validators.required],
      intervaloAtualizacao: [24, Validators.required],
    });
  }

  save(): void {
    if (this.bankForm.valid) {
      this.dialogRef.close(this.bankForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
