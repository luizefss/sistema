// inss-simulator.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Definimos uma interface para os tipos de obra e seus resultados para melhor type safety
interface InssCalcResult {
  baseCalculo: number;
  aliquota: number;
  totalInss: number;
}

interface TipoObraAliquotas {
  residencial: number;
  comercial: number;
  industrial: number;
}

@Component({
  selector: 'app-inss-simulator',
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
      <h2 mat-dialog-title>Simulador INSS Obra</h2>

      <form [formGroup]="simulatorForm" (ngSubmit)="calculate()">
        <mat-dialog-content>
          <div class="form-section">
            <mat-form-field>
              <mat-label>Tipo de Obra</mat-label>
              <mat-select
                formControlName="tipoObra"
                (selectionChange)="updateAliquota()"
              >
                <mat-option value="residencial">Residencial</mat-option>
                <mat-option value="comercial">Comercial</mat-option>
                <mat-option value="industrial">Industrial</mat-option>
              </mat-select>
              <mat-error
                *ngIf="simulatorForm.get('tipoObra')?.hasError('required')"
              >
                Tipo de obra é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Área Total (m²)</mat-label>
              <input matInput type="number" formControlName="areaTotal" />
              <mat-error
                *ngIf="simulatorForm.get('areaTotal')?.hasError('required')"
              >
                Área total é obrigatória
              </mat-error>
              <mat-error
                *ngIf="simulatorForm.get('areaTotal')?.hasError('min')"
              >
                Área deve ser maior que zero
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Valor Mão de Obra</mat-label>
              <input matInput type="number" formControlName="valorMaoDeObra" />
              <span matPrefix>R$&nbsp;</span>
              <mat-error
                *ngIf="
                  simulatorForm.get('valorMaoDeObra')?.hasError('required')
                "
              >
                Valor da mão de obra é obrigatório
              </mat-error>
              <mat-error
                *ngIf="simulatorForm.get('valorMaoDeObra')?.hasError('min')"
              >
                Valor deve ser maior que zero
              </mat-error>
            </mat-form-field>
          </div>

          <!-- Resultados do cálculo -->
          <div class="results" *ngIf="resultados">
            <h3>Resultados</h3>
            <div class="result-item">
              <span>Base de Cálculo:</span>
              <strong
                >R$ {{ resultados.baseCalculo | number : '1.2-2' }}</strong
              >
            </div>
            <div class="result-item">
              <span>Alíquota:</span>
              <strong>{{ resultados.aliquota }}%</strong>
            </div>
            <div class="result-item total">
              <span>Total INSS:</span>
              <strong>R$ {{ resultados.totalInss | number : '1.2-2' }}</strong>
            </div>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="close()">Fechar</button>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!simulatorForm.valid"
          >
            Calcular
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
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }

      .results {
        background: #f8fafc;
        padding: 16px;
        border-radius: 8px;
        margin-top: 24px;
      }

      .result-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        padding: 8px 0;
        border-bottom: 1px solid #e2e8f0;

        &.total {
          border-bottom: none;
          font-size: 1.2em;
          color: #0284c7;
        }
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class InssSimulatorComponent implements OnInit {
  simulatorForm!: FormGroup;
  resultados?: InssCalcResult;

  // Definimos as alíquotas para cada tipo de obra
  private readonly aliquotas: TipoObraAliquotas = {
    residencial: 11,
    comercial: 20,
    industrial: 20,
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<InssSimulatorComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
       const savedCalculations = localStorage.getItem('lastInssCalculation');
    if (savedCalculations) {
      const lastCalc = JSON.parse(savedCalculations);
      this.simulatorForm.patchValue(lastCalc);
      this.calculate(); // Recalcula com os valores salvos // Inicialização adicional se necessário
  }}

  private createForm(): void {
    this.simulatorForm = this.fb.group({
      tipoObra: ['', Validators.required],
      areaTotal: ['', [Validators.required, Validators.min(0)]],
      valorMaoDeObra: ['', [Validators.required, Validators.min(0)]],
    });
  }

  updateAliquota(): void {
    if (this.simulatorForm.valid) {
      this.calculate();
    }
  }

  calculate(): void {
    if (this.simulatorForm.valid) {
      const values = this.simulatorForm.value;
      const tipoObra = values.tipoObra as keyof TipoObraAliquotas;
      const aliquota = this.aliquotas[tipoObra];
      const baseCalculo = values.valorMaoDeObra;
      const totalInss = (baseCalculo * aliquota) / 100;

      this.resultados = {
        baseCalculo,
        aliquota,
        totalInss,
      };
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
