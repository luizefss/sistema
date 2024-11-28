// compare-plans.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface PlanFeature {
 name: string;
 description: string;
 starter: boolean | string;
 professional: boolean | string;
 enterprise: boolean | string;
 tooltip?: string;
}

@Component({
 selector: 'app-compare-plans',
 standalone: true,
 imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
 template: `
   <section class="compare-plans">
     <div class="container">
       <h2>Compare os Planos</h2>
       <p class="section-subtitle">
         Escolha o plano ideal para seu escritório
       </p>

       <!-- Tabela de Comparação -->
       <div class="comparison-table">
         <!-- Header -->
         <div class="table-header">
           <div class="feature-col">Recursos</div>
           <div class="plan-col">
             <h3>Starter</h3>
             <div class="price">
               <span class="amount">R$ 49</span>
               <span class="period">/mês</span>
             </div>
             <button mat-stroked-button color="primary">Começar</button>
           </div>
           <div class="plan-col featured">
             <div class="featured-badge">Mais Popular</div>
             <h3>Professional</h3>
             <div class="price">
               <span class="amount">R$ 99</span>
               <span class="period">/mês</span>
             </div>
             <button mat-raised-button color="primary">Escolher Plano</button>
           </div>
           <div class="plan-col">
             <h3>Enterprise</h3>
             <div class="price">
               <span class="amount">R$ 199</span>
               <span class="period">/mês</span>
             </div>
             <button mat-stroked-button color="primary">Contatar</button>
           </div>
         </div>

         <!-- Features -->
         <div class="table-body">
           @for(category of featureCategories; track category.name) {
             <div class="category-row">
               <div class="category-name">{{category.name}}</div>
             </div>
             @for(feature of category.features; track feature.name) {
               <div class="feature-row">
                 <div class="feature-col">
                   <span [matTooltip]="feature.name || ''">
                     {{feature.name}}
                   </span>
                 </div>
                 <div class="plan-col">
                   @if(typeof feature.starter === 'boolean') {
                     <mat-icon [color]="feature.starter ? 'primary' : ''">
                       {{feature.starter ? 'check_circle' : 'remove_circle_outline'}}
                     </mat-icon>
                   } @else {
                     <span>{{feature.starter}}</span>
                   }
                 </div>
                 <div class="plan-col">
                   @if(typeof feature.professional === 'boolean') {
                     <mat-icon [color]="feature.professional ? 'primary' : ''">
                       {{feature.professional ? 'check_circle' : 'remove_circle_outline'}}
                     </mat-icon>
                   } @else {
                     <span>{{feature.professional}}</span>
                   }
                 </div>
                 <div class="plan-col">
                   @if(typeof feature.enterprise === 'boolean') {
                     <mat-icon [color]="feature.enterprise ? 'primary' : ''">
                       {{feature.enterprise ? 'check_circle' : 'remove_circle_outline'}}
                     </mat-icon>
                   } @else {
                     <span>{{feature.enterprise}}</span>
                   }
                 </div>
               </div>
             }
           }
         </div>
       </div>
     </div>
   </section>
 `,
 styles: [`
   .compare-plans {
     padding: 80px 0;
     background: #f8f9fa;
   }

   .container {
     max-width: 1200px;
     margin: 0 auto;
     padding: 0 24px;
     overflow-x: auto;
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

   .comparison-table {
     background: white;
     border-radius: 8px;
     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
     min-width: 800px;
   }

   .table-header {
     display: grid;
     grid-template-columns: 2fr repeat(3, 1fr);
     padding: 24px;
     border-bottom: 1px solid #eee;
     gap: 16px;

     .plan-col {
       text-align: center;
       padding: 24px;
       position: relative;

       &.featured {
         background: #f8f9fa;
         border-radius: 8px;
         transform: scale(1.05);
         box-shadow: 0 4px 6px rgba(0,0,0,0.1);
       }

       h3 {
         margin-bottom: 16px;
       }

       .price {
         margin-bottom: 24px;

         .amount {
           font-size: 2rem;
           font-weight: 700;
         }

         .period {
           color: #666;
         }
       }

       .featured-badge {
         position: absolute;
         top: -12px;
         left: 50%;
         transform: translateX(-50%);
         background: #ff4081;
         color: white;
         padding: 4px 12px;
         border-radius: 12px;
         font-size: 0.875rem;
       }
     }
   }

   .table-body {
     .category-row {
       background: #f8f9fa;
       padding: 12px 24px;
       font-weight: 500;

       .category-name {
         grid-column: 1 / -1;
       }
     }

     .feature-row {
       display: grid;
       grid-template-columns: 2fr repeat(3, 1fr);
       padding: 16px 24px;
       border-bottom: 1px solid #eee;
       align-items: center;

       &:hover {
         background: #f8f9fa;
       }

       .plan-col {
         text-align: center;

         mat-icon {
           font-size: 20px;
         }
       }
     }
   }
 `]
})
export default class ComparePlansComponent {
 featureCategories = [
   {
     name: 'Recursos Básicos',
     features: [
       {
         name: 'Número de Usuários',
         starter: '1 usuário',
         professional: '3 usuários',
         enterprise: 'Ilimitado',
         tooltip: 'Usuários com acesso simultâneo'
       },
       {
         name: 'Ferramentas disponíveis',
         starter: '3',
         professional: 'Todas',
         enterprise: 'Todas + Customização',
         tooltip: 'Quantidade de ferramentas que podem ser utilizadas'
       }
     ]
   },
   {
     name: 'Limites de Uso',
     features: [
       {
         name: 'INSS Obra',
         starter: '10/mês',
         professional: '50/mês',
         enterprise: 'Ilimitado',
         tooltip: 'Cálculos de INSS por mês'
       },
       {
         name: 'Geração de Contratos',
         starter: '20/mês',
         professional: '100/mês',
         enterprise: 'Ilimitado',
         tooltip: 'Contratos gerados por mês'
       }
     ]
   },
   {
     name: 'Suporte',
     features: [
       {
         name: 'Email',
         starter: true,
         professional: true,
         enterprise: true
       },
       {
         name: 'Chat',
         starter: false,
         professional: true,
         enterprise: true
       },
       {
         name: 'Telefone',
         starter: false,
         professional: false,
         enterprise: true
       },
       {
         name: 'Tempo de Resposta',
         starter: '24h',
         professional: '8h',
         enterprise: '2h'
       }
     ]
   },
   {
     name: 'Recursos Avançados',
     features: [
       {
         name: 'API Access',
         starter: false,
         professional: true,
         enterprise: true,
         tooltip: 'Acesso à API para integrações'
       },
       {
         name: 'Relatórios Avançados',
         starter: false,
         professional: true,
         enterprise: true
       },
       {
         name: 'Customização',
         starter: false,
         professional: false,
         enterprise: true,
         tooltip: 'Personalização de ferramentas'
       }
     ]
   }
 ];
}