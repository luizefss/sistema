// faq.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatButtonModule],
  template: `
    <section class="faq-section">
      <div class="container">
        <h2>Perguntas Frequentes</h2>
        <p class="section-subtitle">
          Tire suas dúvidas sobre nossa plataforma
        </p>

        <div class="faq-grid">
          <mat-accordion>
            @for(faq of faqs; track faq.question) {
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    {{faq.question}}
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <p [innerHTML]="faq.answer"></p>
              </mat-expansion-panel>
            }
          </mat-accordion>

          <div class="support-card">
            <h3>Ainda tem dúvidas?</h3>
            <p>Nossa equipe está pronta para ajudar você</p>
            <div class="support-options">
              <a href="/suporte" mat-raised-button color="primary">
                Centro de Ajuda
              </a>
              <a href="/contato" mat-stroked-button>
                Falar com Consultor
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .faq-section {
      padding: 80px 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 16px;
      color: #1976d2;
    }

    .section-subtitle {
      text-align: center;
      font-size: 1.25rem;
      color: #666;
      margin-bottom: 48px;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 48px;
      align-items: start;
    }

    mat-accordion {
      .mat-expansion-panel {
        margin-bottom: 16px;
        border-radius: 8px;
      }
    }

    .support-card {
      background: #f8f9fa;
      padding: 32px;
      border-radius: 8px;
      text-align: center;

      h3 {
        margin-bottom: 16px;
      }

      p {
        color: #666;
        margin-bottom: 24px;
      }

      .support-options {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }

    @media (max-width: 768px) {
      .faq-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export default class FaqComponent {
  faqs = [
    {
      question: 'Como funciona o período de teste?',
      answer: 'Oferecemos 7 dias de teste grátis em todos os planos, sem necessidade de cartão de crédito. Durante este período, você terá acesso a todas as funcionalidades do plano escolhido.'
    },
    {
      question: 'Preciso instalar algum software?',
      answer: 'Não, nossa plataforma é 100% web-based. Você só precisa de um navegador moderno e conexão com a internet para acessar todas as ferramentas.'
    },
    {
      question: 'Como funciona a cobrança?',
      answer: 'A cobrança é feita mensalmente através de cartão de crédito ou boleto bancário. Nos planos anuais, oferecemos um desconto de 20% sobre o valor mensal.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento. Não há multa por cancelamento, e você continuará tendo acesso até o final do período pago.'
    },
    {
      question: 'Como funciona o suporte técnico?',
      answer: 'Oferecemos diferentes níveis de suporte de acordo com seu plano:<br>- Starter: Suporte por email em horário comercial<br>- Professional: Suporte por email e chat<br>- Enterprise: Suporte prioritário 24/7'
    },
    {
      question: 'Os dados são seguros?',
      answer: 'Sim, utilizamos criptografia de ponta a ponta e seguimos todas as normas de segurança e LGPD. Nossos servidores são redundantes e realizamos backups diários de todos os dados.'
    }
  ];
}