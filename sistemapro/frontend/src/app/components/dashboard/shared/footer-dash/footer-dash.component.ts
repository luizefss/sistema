// footer-dash.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer-dash',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <mat-toolbar class="footer-dashboard">
      <div class="footer-content">
        <span class="copyright">© 2024 SistemaPro - Automação Empresarial</span>
        <div class="footer-links">
          <a href="/suporte">Suporte</a>
          <a href="/termos">Termos de Uso</a>
          <a href="/privacidade">Privacidade</a>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      .footer-dashboard {
        background: var(--mat-toolbar-container-background-color);
        color: var(--mat-toolbar-container-text-color);
        padding: 8px 16px;
        position: relative;
        bottom: 0;
        width: 100%;
      }

      .footer-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }

      .footer-links {
        display: flex;
        gap: 24px;

        a {
          color: inherit;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      @media (max-width: 600px) {
        .footer-content {
          flex-direction: column;
          gap: 8px;
          text-align: center;
        }
      }
    `,
  ],
})
export class FooterDashComponent {}
