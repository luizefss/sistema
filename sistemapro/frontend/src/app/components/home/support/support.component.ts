// support.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
 selector: 'app-support',
 standalone: true,
 imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
 template: `
   <section class="support-section">
     <div class="container">
       <h2>Suporte Especializado</h2>
       <p class="section-subtitle">
         Conte com nossa equipe para ajudar você
       </p>

       <div class="support-grid">
         <!-- Canais de Atendimento -->
         <mat-card class="support-card">
           <mat-card-header>
             <mat-icon class="header-icon">headset_mic</mat-icon>
             <mat-card-title>Canais de Atendimento</mat-card-title>
           </mat-card-header>
           <mat-card-content>
             <div class="support-channels">
               <div class="channel">
                 <mat-icon>chat</mat-icon>
                 <span>Chat Online</span>
                 <p>Seg-Sex: 8h às 18h</p>
               </div>
               <div class="channel">
                 <mat-icon>email</mat-icon>
                 <span>Email</span>
                 <p>Resposta em até 24h</p>
               </div>
               <div class="channel">
                 <mat-icon>phone</mat-icon>
                 <span>Telefone</span>
                 <p>Planos Pro e Enterprise</p>
               </div>
             </div>
           </mat-card-content>
         </mat-card>

         <!-- Treinamento -->
         <mat-card class="support-card">
           <mat-card-header>
             <mat-icon class="header-icon">school</mat-icon>
             <mat-card-title>Treinamento</mat-card-title>
           </mat-card-header>
           <mat-card-content>
             <ul class="training-list">
               <li>
                 <mat-icon>play_circle</mat-icon>
                 <div>
                   <strong>Vídeos Tutoriais</strong>
                   <p>Aprenda a usar todas as ferramentas</p>
                 </div>
               </li>
               <li>
                 <mat-icon>article</mat-icon>
                 <div>
                   <strong>Documentação</strong>
                   <p>Guias detalhados e exemplos</p>
                 </div>
               </li>
               <li>
                 <mat-icon>groups</mat-icon>
                 <div>
                   <strong>Webinars</strong>
                   <p>Treinamentos ao vivo semanais</p>
                 </div>
               </li>
             </ul>
           </mat-card-content>
         </mat-card>

         <!-- Consultoria -->
         <mat-card class="support-card">
           <mat-card-header>
             <mat-icon class="header-icon">psychology</mat-icon>
             <mat-card-title>Consultoria</mat-card-title>
           </mat-card-header>
           <mat-card-content>
             <div class="consulting-info">
               <p class="feature"><mat-icon>check_circle</mat-icon> Implementação assistida</p>
               <p class="feature"><mat-icon>check_circle</mat-icon> Customização de ferramentas</p>
               <p class="feature"><mat-icon>check_circle</mat-icon> Análise de processos</p>
               <button mat-raised-button color="primary">
                 Falar com Consultor
               </button>
             </div>
           </mat-card-content>
         </mat-card>
       </div>

       <!-- SLA Info -->
       <div class="sla-info">
         <h3>Nosso Compromisso</h3>
         <div class="sla-grid">
           <div class="sla-item">
             <div class="sla-value">15min</div>
             <div class="sla-label">Tempo médio primeira resposta</div>
           </div>
           <div class="sla-item">
             <div class="sla-value">98%</div>
             <div class="sla-label">Taxa de resolução</div>
           </div>
           <div class="sla-item">
             <div class="sla-value">24/7</div>
             <div class="sla-label">Monitoramento</div>
           </div>
         </div>
       </div>
     </div>
   </section>
 `,
 styles: [`
   .support-section {
     padding: 80px 0;
     background: #f8f9fa;
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

   .support-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
     gap: 24px;
     margin-bottom: 48px;
   }

   .support-card {
     height: 100%;

     .header-icon {
       font-size: 48px;
       height: 48px;
       width: 48px;
       margin-bottom: 16px;
       color: #1976d2;
     }

     mat-card-title {
       text-align: center;
       margin-bottom: 24px;
     }
   }

   .support-channels {
     display: flex;
     flex-direction: column;
     gap: 16px;

     .channel {
       display: flex;
       flex-direction: column;
       align-items: center;
       text-align: center;
       padding: 16px;
       border-radius: 8px;
       background: #f5f5f5;

       mat-icon {
         font-size: 32px;
         height: 32px;
         width: 32px;
         margin-bottom: 8px;
         color: #1976d2;
       }

       span {
         font-weight: 500;
         margin-bottom: 4px;
       }

       p {
         margin: 0;
         color: #666;
         font-size: 0.875rem;
       }
     }
   }

   .training-list {
     list-style: none;
     padding: 0;
     margin: 0;

     li {
       display: flex;
       align-items: center;
       gap: 16px;
       margin-bottom: 24px;

       mat-icon {
         color: #1976d2;
         font-size: 32px;
         height: 32px;
         width: 32px;
       }

       strong {
         display: block;
         margin-bottom: 4px;
       }

       p {
         margin: 0;
         color: #666;
         font-size: 0.875rem;
       }
     }
   }

   .consulting-info {
     text-align: center;

     .feature {
       display: flex;
       align-items: center;
       justify-content: center;
       gap: 8px;
       margin-bottom: 16px;

       mat-icon {
         color: #4caf50;
       }
     }

     button {
       margin-top: 24px;
     }
   }

   .sla-info {
     text-align: center;
     margin-top: 64px;

     h3 {
       font-size: 1.5rem;
       margin-bottom: 32px;
     }
   }

   .sla-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     gap: 24px;
   }

   .sla-item {
     .sla-value {
       font-size: 2rem;
       font-weight: 700;
       color: #1976d2;
       margin-bottom: 8px;
     }

     .sla-label {
       color: #666;
     }
   }

   @media (max-width: 768px) {
     .support-grid {
       grid-template-columns: 1fr;
     }

     .sla-grid {
       grid-template-columns: 1fr;
     }
   }
 `]
})
export default class SupportComponent {}