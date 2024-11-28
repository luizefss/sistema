import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatProgressSpinner,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  template: `
    <div class="register-container">
      <h2 mat-dialog-title>Criar Conta</h2>
      
      <mat-dialog-content>
        <form [formGroup]="registerForm" class="register-form">
          <!-- Nome -->
          <mat-form-field appearance="outline">
            <mat-label>Nome completo</mat-label>
            <mat-icon matPrefix>person</mat-icon>
            <input 
              matInput 
              formControlName="name" 
              placeholder="Seu nome completo"
            >
            <mat-error *ngIf="registerForm.get('name')?.hasError('required') && registerForm.get('name')?.touched">
              Nome é obrigatório
            </mat-error>
          </mat-form-field>

          <!-- Email -->
          <mat-form-field appearance="outline">
            <mat-label>Email profissional</mat-label>
            <mat-icon matPrefix>email</mat-icon>
            <input 
              matInput 
              formControlName="email" 
              type="email" 
              placeholder="seu@escritorio.com"
            >
            <mat-error *ngIf="registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched">
              Email é obrigatório
            </mat-error>
            <mat-error *ngIf="registerForm.get('email')?.hasError('email') && registerForm.get('email')?.touched">
              Email inválido
            </mat-error>
          </mat-form-field>

          <!-- Área de Atuação -->
          <mat-form-field appearance="outline">
            <mat-label>Área de Atuação</mat-label>
            <mat-icon matPrefix>business</mat-icon>
            <mat-select formControlName="area">
              <mat-option value="contabilidade">Contabilidade</mat-option>
              <mat-option value="advocacia">Advocacia</mat-option>
              <mat-option value="engenharia">Engenharia</mat-option>
              <mat-option value="arquitetura">Arquitetura</mat-option>
              <mat-option value="outro">Outro</mat-option>
            </mat-select>
          </mat-form-field>

          <!-- Senha -->
          <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <mat-icon matPrefix>lock</mat-icon>
            <input 
              matInput 
              [type]="hidePassword ? 'password' : 'text'"
              formControlName="password"
            >
            <mat-icon 
              matSuffix 
              (click)="hidePassword = !hidePassword"
              style="cursor: pointer"
            >
              {{hidePassword ? 'visibility_off' : 'visibility'}}
            </mat-icon>
            <mat-error *ngIf="registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched">
              Senha é obrigatória
            </mat-error>
            <mat-error *ngIf="registerForm.get('password')?.hasError('minlength') && registerForm.get('password')?.touched">
              Senha deve ter no mínimo 6 caracteres
            </mat-error>
          </mat-form-field>

          <!-- Confirmar Senha -->
          <mat-form-field appearance="outline">
            <mat-label>Confirmar Senha</mat-label>
            <mat-icon matPrefix>lock</mat-icon>
            <input 
              matInput 
              [type]="hidePassword ? 'password' : 'text'"
              formControlName="confirmPassword"
            >
            <mat-error *ngIf="registerForm.hasError('passwordMismatch') && registerForm.get('confirmPassword')?.touched">
              Senhas não conferem
            </mat-error>
          </mat-form-field>

          <!-- Termos -->
          <div class="terms">
            Ao criar uma conta, você concorda com nossos 
            <a href="/termos" target="_blank">Termos de Uso</a> e 
            <a href="/privacidade" target="_blank">Política de Privacidade</a>
          </div>
        </form>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
        <button 
          mat-raised-button 
          color="primary"
          (click)="onSubmit()"
          [disabled]="registerForm.invalid || isLoading"
        >
          <span *ngIf="isLoading">
            <mat-spinner diameter="20"></mat-spinner>
          </span>
          <span *ngIf="!isLoading">
            Criar Conta
          </span>
        </button>
      </mat-dialog-actions>

      <div class="login-link">
        Já tem uma conta? 
        <a (click)="login()">Fazer login</a>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      padding: 24px;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 16px 0;
      min-width: 300px;
    }

    .terms {
      font-size: 0.875rem;
      color: #666;
      text-align: center;
    }
    
    .terms a {
      color: #1976d2;
      text-decoration: none;
    }
    
    .terms a:hover {
      text-decoration: underline;
    }

    .login-link {
      text-align: center;
      margin-top: 16px;
      font-size: 0.875rem;
    }

    .login-link a {
      color: #1976d2;
      cursor: pointer;
      text-decoration: none;
    }
    
    .login-link a:hover {
      text-decoration: underline;
    }

    mat-dialog-actions {
      margin-top: 24px;
      padding: 0;
    }

    mat-spinner {
      margin: 0 8px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      area: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // Aqui você pode integrar com seu backend para registrar o usuário
      setTimeout(() => {
        this.isLoading = false;
        this.dialogRef.close(this.registerForm.value);
        this.snackBar.open('Conta criada com sucesso! Verifique seu email.', 'Fechar', {
          duration: 5000
        });
      }, 1500);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  login() {
    this.dialogRef.close('login');
  }
}
