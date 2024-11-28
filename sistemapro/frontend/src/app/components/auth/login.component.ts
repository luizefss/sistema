import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatProgressSpinner,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  template: `
    <div class="login-container">
      <h2 mat-dialog-title>Entrar</h2>

      <mat-dialog-content>
        <div class="social-login">
          <button mat-stroked-button class="google-btn" (click)="loginWithGoogle()">
            <img src="assets/google-icon.svg" alt="Google">
            Continuar com Google
          </button>
        </div>

        <div class="divider">
          <span>ou</span>
        </div>

        <form [formGroup]="loginForm" class="login-form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" />
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email é obrigatório</mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Insira um email válido</mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Senha</mat-label>
            <input matInput formControlName="password" [type]="hidePassword ? 'password' : 'text'" />
            <mat-icon matSuffix (click)="hidePassword = !hidePassword" style="cursor: pointer">
              {{ hidePassword ? 'visibility_off' : 'visibility' }}
            </mat-icon>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Senha é obrigatória</mat-error>
          </mat-form-field>

          <div class="form-options">
            <mat-checkbox formControlName="rememberMe">Lembrar-me</mat-checkbox>
            <a (click)="forgotPassword()">Esqueceu sua senha?</a>
          </div>

          <div class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
              <span *ngIf="isLoading">
               <div> <mat-spinner diameter="20"></mat-spinner></div>
              </span>
              <span *ngIf="!isLoading">
                Entrar
              </span>
            </button>
            <button mat-button (click)="onCancel()">Cancelar</button>
          </div>
        </form>
      </mat-dialog-content>
    </div>
  `,
  styles: [`
    .login-container {
      padding: 16px;
    }

    .social-login {
      margin-bottom: 24px;
    }

    .google-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }

    .divider {
      text-align: center;
      position: relative;
      margin: 24px 0;
    }

    .divider::before, .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: calc(50% - 30px);
      height: 1px;
      background: #ddd;
    }

    .divider::before { left: 0; }
    .divider::after { right: 0; }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -8px;
    }

    .form-options a {
      cursor: pointer;
      color: #1976d2;
      text-decoration: none;
    }

    .form-options a:hover {
      text-decoration: underline;
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
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.dialog.closeAll();
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Erro ao fazer login: ' + error.message, 'Fechar', {
          duration: 5000,
        });
      },
      complete: () => {
        // Opcional: Ação após a conclusão do Observable (se necessário)
      }
    });
  }
}

  onCancel() {
    this.dialog.closeAll();
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px'
    });
  }

  loginWithGoogle() {
    // Implementação do login com Google
    this.snackBar.open('Login com Google em desenvolvimento', 'OK', { duration: 3000 });
  }
}
