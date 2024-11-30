import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',

  template: `
    <div class="profile-container">
      <mat-card class="profile-card">
        <div class="profile-header">
          <div class="avatar-section">
            <div class="avatar">
              <img
                [src]="user?.avatar || 'assets/default-avatar.png'"
                alt="avatar"
              />
              <button mat-mini-fab (click)="uploadAvatar()">
                <mat-icon>edit</mat-icon>
              </button>
            </div>
            <h2>{{ user?.name }}</h2>
            <p>{{ user?.email }}</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <form [formGroup]="profileForm" (ngSubmit)="saveProfile()">
          <div class="form-content">
            <div class="form-section">
              <h3>Informações Pessoais</h3>
              <mat-form-field>
                <mat-label>Nome</mat-label>
                <input matInput formControlName="name" />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email" />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Telefone</mat-label>
                <input matInput formControlName="phone" />
              </mat-form-field>
            </div>

            <div class="form-section">
              <h3>Plano e Assinatura</h3>
              <div class="plan-info">
                <span
                  >Plano Atual: <strong>{{ user?.plan }}</strong></span
                >
                <span>Status: <strong class="active">Ativo</strong></span>
                <button mat-stroked-button color="primary">
                  Alterar Plano
                </button>
              </div>
            </div>

            <div class="form-section">
              <h3>Segurança</h3>
              <button mat-stroked-button (click)="changePassword()">
                <mat-icon>lock</mat-icon>
                Alterar Senha
              </button>
            </div>
          </div>

          <mat-card-actions align="end">
            <button mat-button type="button">Cancelar</button>
            <button mat-raised-button color="primary" type="submit">
              Salvar Alterações
            </button>
          </mat-card-actions>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .profile-container {
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
      }

      .profile-header {
        text-align: center;
        padding: 24px;
      }

      .avatar-section {
        .avatar {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 16px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }

          button {
            position: absolute;
            bottom: 0;
            right: 0;
          }
        }
      }

      .form-content {
        padding: 24px;
      }

      .form-section {
        margin-bottom: 32px;

        h3 {
          margin-bottom: 16px;
          color: #64748b;
        }

        mat-form-field {
          width: 100%;
          margin-bottom: 16px;
        }
      }

      .plan-info {
        display: flex;
        align-items: center;
        gap: 24px;

        .active {
          color: #16a34a;
        }
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any = {
    name: 'Usuário',
    email: 'usuario@email.com',
    phone: '(11) 99999-9999',
    plan: 'Premium',
  };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  ngOnInit(): void {
    this.profileForm.patchValue(this.user);
  }

  uploadAvatar(): void {
    // Implementar upload
  }

  changePassword(): void {
    // Implementar diálogo de alteração de senha
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      // Implementar salvamento
      this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
        duration: 3000,
      });
    }
  }
}
