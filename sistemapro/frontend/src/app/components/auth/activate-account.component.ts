import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activation-container">
      <h1>Ativando sua conta...</h1>
      <p *ngIf="loading">Por favor, aguarde.</p>
      <p *ngIf="error">{{ error }}</p>
      <p *ngIf="success">{{ success }}</p>
    </div>
  `,
  styles: [
    `
      .activation-container {
        text-align: center;
        padding: 20px;
      }
    `,
  ],
})
export default class ActivateAccountComponent implements OnInit {
  loading = true;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

ngOnInit() {
  const token = this.route.snapshot.queryParamMap.get('token');

  if (!token) {
    this.error = 'Token não fornecido.';
    this.loading = false;
    return;
  }

  // Realiza a requisição ao backend com o token
  this.http
    .get<{ message: string }>(
      `http://localhost:3000/auth/activate-account?token=${encodeURIComponent(token)}`
    )
    .subscribe({
      next: (response) => {
        this.success = response.message;
        this.loading = false;
        this.snackBar.open('Conta ativada com sucesso!', 'OK', {
          duration: 3000,
        });
        setTimeout(() => {
          this.router.navigate(['/']); // Redireciona para a home após ativação
        }, 3000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erro ao ativar a conta.';
        this.loading = false;
      },
    });
}
  }

