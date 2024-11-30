// nfe-config.component.ts
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Interface para configuração da importação de NFe
interface NfeConfig {
  certificado: string; // Caminho ou identificação do certificado digital
  senha: string; // Senha do certificado
  ambiente: 'producao' | 'homologacao'; // Ambiente SEFAZ
  pastaDownload: string; // Pasta para salvar as notas
  intervaloBusca: number; // Intervalo em minutos
  status: 'ativo' | 'inativo';
}

@Component({
  selector: 'app-nfe-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="config-container">
      <h2 mat-dialog-title>
        Configurar Importação NFe
        <span class="status" [class.active]="data.status === 'ativo'">
          {{ data.status === 'ativo' ? 'Ativo' : 'Inativo' }}
        </span>
      </h2>

      <form [formGroup]="nfeForm">
        <mat-dialog-content>
          <!-- Seção do Certificado Digital -->
          <div class="form-section">
            <h3>Certificado Digital</h3>
            <mat-form-field class="full-width">
              <mat-label>Arquivo do Certificado</mat-label>
              <input
                matInput
                formControlName="certificado"
                placeholder="Selecione o certificado"
              />
              <mat-icon matSuffix>upload_file</mat-icon>
              <mat-error
                *ngIf="nfeForm.get('certificado')?.hasError('required')"
              >
                Certificado é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Senha do Certificado</mat-label>
              <input
                matInput
                [type]="hidePassword ? 'password' : 'text'"
                formControlName="senha"
              />
              <mat-icon
                matSuffix
                (click)="hidePassword = !hidePassword"
                style="cursor: pointer"
              >
                {{ hidePassword ? 'visibility_off' : 'visibility' }}
              </mat-icon>
              <mat-error *ngIf="nfeForm.get('senha')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>
          </div>

          <!-- Configurações de Importação -->
          <div class="form-section">
            <h3>Configurações de Importação</h3>
            <mat-form-field>
              <mat-label>Ambiente</mat-label>
              <mat-select formControlName="ambiente">
                <mat-option value="producao">Produção</mat-option>
                <mat-option value="homologacao">Homologação</mat-option>
              </mat-select>
              <mat-error *ngIf="nfeForm.get('ambiente')?.hasError('required')">
                Ambiente é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Pasta de Download</mat-label>
              <input matInput formControlName="pastaDownload" />
              <mat-icon matSuffix>folder</mat-icon>
              <mat-error
                *ngIf="nfeForm.get('pastaDownload')?.hasError('required')"
              >
                Pasta de download é obrigatória
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Intervalo de Busca (minutos)</mat-label>
              <input
                matInput
                type="number"
                formControlName="intervaloBusca"
                min="5"
                max="1440"
              />
              <mat-error *ngIf="nfeForm.get('intervaloBusca')?.hasError('min')">
                Intervalo mínimo é 5 minutos
              </mat-error>
              <mat-error *ngIf="nfeForm.get('intervaloBusca')?.hasError('max')">
                Intervalo máximo é 24 horas (1440 minutos)
              </mat-error>
            </mat-form-field>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button (click)="close()">Cancelar</button>
          <button
            mat-raised-button
            color="primary"
            (click)="save()"
            [disabled]="!nfeForm.valid || isSaving"
          >
            <span *ngIf="!isSaving">Salvar</span>
            <mat-icon *ngIf="isSaving">sync</mat-icon>
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

        h3 {
          color: #64748b;
          font-size: 16px;
          margin-bottom: 16px;
        }
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

      mat-icon {
        vertical-align: middle;
      }
    `,
  ],
})
export class NfeConfigComponent implements OnInit {
  nfeForm!: FormGroup;
  hidePassword = true;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NfeConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NfeConfig
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.nfeForm.patchValue(this.data);
    }
  }

  private createForm(): void {
    this.nfeForm = this.fb.group({
      certificado: ['', Validators.required],
      senha: ['', Validators.required],
      ambiente: ['producao', Validators.required],
      pastaDownload: ['', Validators.required],
      intervaloBusca: [
        30,
        [Validators.required, Validators.min(5), Validators.max(1440)],
      ],
      status: ['inativo'],
    });
  }

  save(): void {
    if (this.nfeForm.valid) {
      this.isSaving = true;
      // Aqui você implementaria a lógica de salvamento
      setTimeout(() => {
        this.isSaving = false;
        this.dialogRef.close(this.nfeForm.value);
      }, 1000);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
