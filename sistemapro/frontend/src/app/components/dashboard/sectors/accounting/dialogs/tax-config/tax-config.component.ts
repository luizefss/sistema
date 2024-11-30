// tax-config.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Interface para tipagem dos dados do formulário
interface TaxConfig {
  tiposImposto: string[];
  diaVencimento: number;
  antecedenciaAlerta: number;
  enviarEmail: boolean;
  emailsNotificacao: string[];
  status: 'ativo' | 'inativo';
}

@Component({
  selector: 'app-tax-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
  ],
  template: `
    <div class="config-container">
      <h2 mat-dialog-title>
        Configurar Gestão de Impostos
        <span class="status" [class.active]="data.status === 'ativo'">
          {{ data.status === 'ativo' ? 'Ativo' : 'Inativo' }}
        </span>
      </h2>

      <form [formGroup]="taxForm">
        <mat-dialog-content>
          <!-- Seção de Tipos de Impostos - Personalize os tipos conforme necessário -->
          <div class="form-section">
            <h3>Tipos de Impostos</h3>
            <mat-form-field class="full-width">
              <mat-label>Selecione os Impostos</mat-label>
              <mat-select formControlName="tiposImposto" multiple>
                <mat-option value="das">DAS (Simples Nacional)</mat-option>
                <mat-option value="icms">ICMS</mat-option>
                <mat-option value="iss">ISS</mat-option>
                <mat-option value="irpj">IRPJ</mat-option>
                <mat-option value="csll">CSLL</mat-option>
                <!-- Adicione outros impostos conforme necessário -->
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Configurações de Prazo -->
          <div class="form-section">
            <h3>Configurações de Prazo</h3>
            <div class="form-row">
              <mat-form-field>
                <mat-label>Dia de Vencimento</mat-label>
                <input
                  matInput
                  type="number"
                  formControlName="diaVencimento"
                  min="1"
                  max="31"
                />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Dias de Antecedência (Alerta)</mat-label>
                <input
                  matInput
                  type="number"
                  formControlName="antecedenciaAlerta"
                  min="1"
                  max="30"
                />
              </mat-form-field>
            </div>
          </div>

          <!-- Configurações de Notificação -->
          <div class="form-section">
            <h3>Notificações</h3>
            <div class="notification-config">
              <mat-checkbox formControlName="enviarEmail">
                Enviar alertas por email
              </mat-checkbox>
            </div>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button (click)="close()">Cancelar</button>
          <button
            mat-raised-button
            color="primary"
            (click)="save()"
            [disabled]="!taxForm.valid"
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
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .full-width {
        width: 100%;
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

      .notification-config {
        margin-top: 16px;
      }
    `,
  ],
})
export class TaxConfigComponent implements OnInit {
  // Inicialização do formulário com ! para evitar erros de undefined
  taxForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaxConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaxConfig
  ) {
    this.createForm();
  }

  // Método do ciclo de vida para inicialização do componente
  ngOnInit(): void {
    if (this.data) {
      this.taxForm.patchValue(this.data);
    }
  }

  // Criação do formulário com validações
  private createForm(): void {
    this.taxForm = this.fb.group({
      tiposImposto: [[], Validators.required], // Array vazio inicial
      diaVencimento: [
        5,
        [Validators.required, Validators.min(1), Validators.max(31)],
      ],
      antecedenciaAlerta: [
        5,
        [Validators.required, Validators.min(1), Validators.max(30)],
      ],
      enviarEmail: [false],
      status: ['inativo'],
    });
  }

  // Método para salvar as configurações
  save(): void {
    if (this.taxForm.valid) {
      this.dialogRef.close(this.taxForm.value);
    }
  }

  // Método para fechar o modal sem salvar
  close(): void {
    this.dialogRef.close();
  }
}
