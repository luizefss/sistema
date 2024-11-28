import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="forgot-password-container">
      <h2 mat-dialog-title>Redefinir Senha</h2>

      <mat-dialog-content>
        <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" />
            <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('required')">Email é obrigatório</mat-error>
            <mat-error *ngIf="forgotPasswordForm.get('email')?.hasError('email')">Insira um email válido</mat-error>
          </mat-form-field>

          <div class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="forgotPasswordForm.invalid || isLoading">
              <span *ngIf="isLoading">
                <mat-spinner diameter="20"></mat-spinner>
              </span>
              <span *ngIf="!isLoading">
                Enviar Link de Redefinição
              </span>
            </button>
            <button mat-button (click)="onCancel()">Cancelar</button>
          </div>
        </form>
      </mat-dialog-content>
    </div>
  `,
  styles: [`
    .forgot-password-container {
      padding: 16px;
    }

    .actions {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    mat-spinner {
      margin: 0 8px;
    }
  `]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
        (response) => {
          this.isLoading = false;
          this.snackBar.open('Email de redefinição enviado!', 'Fechar', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        (error) => {
          this.isLoading = false;
          this.snackBar.open('Erro ao enviar email: ' + error.message, 'Fechar', {
            duration: 5000,
          });
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
