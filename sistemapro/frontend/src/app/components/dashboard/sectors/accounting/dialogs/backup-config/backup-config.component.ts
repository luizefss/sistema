import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

// interfaces/backup.interface.ts
export interface BackupConfig {
  frequencia: 'diario' | 'semanal' | 'mensal';
  horario: string;
  destinoLocal: string;
  destinoNuvem: string;
  retencao: number;
  compressao: boolean;
  status: 'ativo' | 'inativo';
}

// backup-config.component.ts
@Component({
  selector: 'app-backup-config',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,

  ],
  template: `
    <div class="config-container">
      <h2 mat-dialog-title>
        Configurar Backup Automático
        <span class="status" [class.active]="data.status === 'ativo'">
          {{ data.status === 'ativo' ? 'Ativo' : 'Inativo' }}
        </span>
      </h2>

      <form [formGroup]="backupForm">
        <mat-dialog-content>
          <div class="form-section">
            <h3>Agendamento</h3>
            <div class="form-row">
              <mat-form-field>
                <mat-label>Frequência</mat-label>
                <mat-select formControlName="frequencia">
                  <mat-option value="diario">Diário</mat-option>
                  <mat-option value="semanal">Semanal</mat-option>
                  <mat-option value="mensal">Mensal</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field>
                <mat-label>Horário</mat-label>
                <input matInput type="time" formControlName="horario" />
              </mat-form-field>
            </div>
          </div>

          <div class="form-section">
            <h3>Destino</h3>
            <mat-form-field class="full-width">
              <mat-label>Pasta Local</mat-label>
              <input matInput formControlName="destinoLocal" />
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Pasta na Nuvem</mat-label>
              <input matInput formControlName="destinoNuvem" />
            </mat-form-field>
          </div>

          <div class="form-section">
            <h3>Configurações Avançadas</h3>
            <mat-form-field>
              <mat-label>Retenção (dias)</mat-label>
              <input matInput type="number" formControlName="retencao" />
            </mat-form-field>

            <div class="checkbox-group">
              <mat-checkbox formControlName="compressao">
                Comprimir arquivos
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
            [disabled]="!backupForm.valid"
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

      .checkbox-group {
        margin-top: 16px;
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
    `,
  ],
})
export class BackupConfigComponent implements OnInit {
  backupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BackupConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BackupConfig
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.backupForm.patchValue(this.data);
    }
  }

  private createForm(): void {
    this.backupForm = this.fb.group({
      frequencia: ['diario', Validators.required],
      horario: ['00:00', Validators.required],
      destinoLocal: ['', Validators.required],
      destinoNuvem: ['', Validators.required],
      retencao: [30, [Validators.required, Validators.min(1)]],
      compressao: [true],
      status: ['inativo'],
    });
  }

  save(): void {
    if (this.backupForm.valid) {
      this.dialogRef.close(this.backupForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
