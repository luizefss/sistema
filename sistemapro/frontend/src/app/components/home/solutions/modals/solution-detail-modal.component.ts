// solution-detail-modal.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
 selector: 'app-solution-detail-modal',
 standalone: true,
 imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTabsModule],
 template: `
   <div class="modal-container">
     <div class="modal-header" [style.borderColor]="data.color">
       <div class="header-content">
         <div class="solution-icon" [style.backgroundColor]="data.color + '15'">
           <mat-icon [style.color]="data.color">{{data.icon}}</mat-icon>
         </div>
         <div class="solution-info">
           <h2>{{data.area}}</h2>
           <p>{{data.description}}</p>
         </div>
         <button mat-icon-button (click)="close()" class="close-btn">
           <mat-icon>close</mat-icon>
         </button>
       </div>
     </div>

     <mat-tab-group class="modal-content">
       <mat-tab label="Ferramentas">
         <div class="tools-grid">
           @for (tool of data.tools; track tool.name) {
             <div class="tool-card">
               <div class="tool-header">
                 <mat-icon [style.color]="data.color">{{tool.icon}}</mat-icon>
                 <div class="tool-info">
                   <h3>{{tool.name}}</h3>
                   <p>{{tool.description}}</p>
                   @if (tool.status === 'coming-soon') {
                     <span class="coming-soon">Em breve</span>
                   }
                 </div>
               </div>
               
               @if (tool.status === 'available') {
                 <button 
                   mat-stroked-button 
                   [style.color]="data.color"
                   class="w-full mt-4"
                   (click)="showToolDetails(tool)"
                 >
                   Ver detalhes
                   <mat-icon class="ml-2">info</mat-icon>
                 </button>
               }
             </div>
           }
         </div>
       </mat-tab>

       <mat-tab label="Integrações">
         <div class="integrations-content">
           <div class="integrations-grid">
             @for (integration of integrations; track integration) {
               <div class="integration-card">
                 <img [src]="integration.logo" [alt]="integration.name">
                 <h3>{{integration.name}}</h3>
                 <p>{{integration.description}}</p>
               </div>
             }
           </div>
         </div>
       </mat-tab>

       <mat-tab label="Planos">
         <div class="pricing-content">
           <div class="pricing-grid">
             @for (plan of plans; track plan.name) {
               <div class="price-card" [class.featured]="plan.featured">
                 <h3>{{plan.name}}</h3>
                 <div class="price">
                   <span class="currency">R$</span>
                   <span class="amount">{{plan.price}}</span>
                   <span class="period">/mês</span>
                 </div>
                 <ul class="features">
                   @for (feature of plan.features; track feature) {
                     <li>
                       <mat-icon [style.color]="data.color">check</mat-icon>
                       {{feature}}
                     </li>
                   }
                 </ul>
                 <button 
                   mat-raised-button
                   [color]="plan.featured ? 'accent' : 'primary'"
                   class="w-full"
                 >
                   Selecionar plano
                 </button>
               </div>
             }
           </div>
         </div>
       </mat-tab>
     </mat-tab-group>

     <div class="modal-footer">
       <button mat-button (click)="close()">Fechar</button>
       <button 
         mat-raised-button 
         [style.backgroundColor]="data.color"
         class="start-trial-btn"
         (click)="startTrial()"
       >
         Começar Trial Grátis
         <mat-icon>arrow_forward</mat-icon>
       </button>
     </div>
   </div>
 `,
 styles: [`
   .modal-container {
    display: flex;
    flex-direction: column;
    height: 80vh; // Altura fixa
    max-height: 800px; // Máximo
    width: 100%;
    background: var(--modal-bg);
  }

   .modal-header {
     padding: 24px;
     border-bottom: 3px solid;
     background: var(--card-bg);
   }

   .header-content {
     display: flex;
     gap: 20px;
     align-items: flex-start;
     position: relative;
   }

   .solution-icon {
     width: 56px;
     height: 56px;
     border-radius: 12px;
     display: flex;
     align-items: center;
     justify-content: center;

     mat-icon {
       font-size: 32px;
     }
   }

   .solution-info {
     flex: 1;

     h2 {
       font-size: 1.75rem;
       font-weight: 600;
       margin-bottom: 0.5rem;
       color: var(--text-primary);
     }

     p {
       color: var(--text-secondary);
     }
   }

   .modal-content {
     flex: 1;
     overflow: auto;
     padding: 24px;

     ::ng-deep .mat-mdc-tab-body-wrapper {
       padding: 24px 0;
     }
   }

   .tools-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
     gap: 20px;
   }

   .tool-card {
     background: var(--card-bg);
     padding: 20px;
     border-radius: 12px;
     border: 1px solid var(--border-color);

     &:hover {
       box-shadow: 0 4px 12px var(--shadow-color);
     }
   }

   .tool-header {
     display: flex;
     gap: 16px;

     mat-icon {
       font-size: 24px;
     }
   }

   .tool-info {
     h3 {
       font-size: 1.1rem;
       font-weight: 500;
       margin-bottom: 4px;
       color: var(--text-primary);
     }

     p {
       font-size: 0.875rem;
       color: var(--text-secondary);
       margin-bottom: 8px;
     }
   }

   .coming-soon {
     display: inline-block;
     padding: 4px 8px;
     border-radius: 999px;
     font-size: 0.75rem;
     background: var(--bg-secondary);
     color: var(--primary-color);
   }

   .integrations-grid,
   .pricing-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 24px;
   }

   .integration-card {
     background: var(--card-bg);
     padding: 20px;
     border-radius: 12px;
     text-align: center;

     img {
       width: 64px;
       height: 64px;
       margin-bottom: 16px;
     }

     h3 {
       font-size: 1.1rem;
       margin-bottom: 8px;
       color: var(--text-primary);
     }

     p {
       font-size: 0.875rem;
       color: var(--text-secondary);
     }
   }

   .price-card {
     background: var(--card-bg);
     padding: 24px;
     border-radius: 12px;
     text-align: center;
     border: 1px solid var(--border-color);

     &.featured {
       border: 2px solid var(--primary-color);
       transform: scale(1.05);
     }

     h3 {
       font-size: 1.25rem;
       margin-bottom: 16px;
       color: var(--text-primary);
     }

     .price {
       margin-bottom: 24px;

       .currency {
         font-size: 1.25rem;
         vertical-align: top;
       }

       .amount {
         font-size: 3rem;
         font-weight: 700;
       }

       .period {
         color: var(--text-secondary);
       }
     }

     .features {
       text-align: left;
       margin-bottom: 24px;

       li {
         display: flex;
         align-items: center;
         gap: 8px;
         margin-bottom: 12px;
         color: var(--text-secondary);
       }
     }
   }

   .modal-footer {
     padding: 16px 24px;
     display: flex;
     justify-content: flex-end;
     gap: 8px;
     border-top: 1px solid var(--border-color);
     background: var(--bg-secondary);
   }

   .start-trial-btn {
     color: white !important;
     display: flex;
     align-items: center;
     gap: 8px;
   }

   @media (max-width: 768px) {
     .tools-grid,
     .integrations-grid,
     .pricing-grid {
       grid-template-columns: 1fr;
     }

     .price-card.featured {
       transform: none;
     }
   }
 `]
})
export default class SolutionDetailModalComponent {
 integrations = [
   {
     name: 'Sistema 1',
     logo: '/assets/logos/sistema1.png',
     description: 'Integração completa'
   },
   // Adicione mais integrações
 ];

 plans = [
   {
     name: 'Básico',
     price: 99,
     features: [
       'Recurso 1',
       'Recurso 2',
       'Recurso 3'
     ]
   },
   {
     name: 'Profissional',
     price: 199,
     featured: true,
     features: [
       'Todos recursos do Básico',
       'Recurso 4',
       'Recurso 5'
     ]
   },
   // Adicione mais planos
 ];

 constructor(
   public dialogRef: MatDialogRef<SolutionDetailModalComponent>,
   @Inject(MAT_DIALOG_DATA) public data: any
 ) {}

 close() {
   this.dialogRef.close();
 }    

 startTrial() {
   this.dialogRef.close('trial');
 }

 showToolDetails(tool: any) {
   this.dialogRef.close();
   // Implementar abertura do modal de detalhes da ferramenta
 }
}