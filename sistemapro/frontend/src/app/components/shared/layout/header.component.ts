import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../core/services/theme.service';
import { LoginComponent } from '../../auth/login.component';
import { RegisterComponent } from '../../auth/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar class="header">
      <div class="container header-content">
        <!-- Logo -->
        <div class="logo">
          <a href="/">
            <span class="logo-text">AutoOffice</span>
          </a>
        </div>

        <!-- Menu -->
        <div class="nav-links">
          <a mat-button href="#beneficios">Benefícios</a>
          <a mat-button href="#planos">Planos</a>
          <a mat-button href="#depoimentos">Depoimentos</a>
          <a mat-button href="#contato">Contato</a>
        </div>

        <!-- Botões de ação -->
        <div class="action-buttons">
          <button 
            mat-icon-button 
            (click)="toggleTheme()">
            <mat-icon>{{ (isDarkMode$ | async) ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          <button 
            mat-flat-button 
            color="accent" 
            (click)="openLogin()">
            <mat-icon>login</mat-icon>
            Entrar
          </button>
          <button 
            mat-raised-button 
            color="primary"
            (click)="openRegister()">
            Começar Agora
          </button>
          <!-- Botão de alternância de tema -->
          
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }
  `]
})
export class HeaderComponent implements OnInit {
  isDarkMode$!: Observable<boolean>;

  constructor(private themeService: ThemeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Observar o estado do tema
    this.isDarkMode$ = this.themeService.darkMode$;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'login-dialog'
    });
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      panelClass: 'register-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.openLogin();
      }
    });
  }
}
