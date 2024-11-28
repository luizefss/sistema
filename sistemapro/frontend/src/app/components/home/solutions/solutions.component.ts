// solutions.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import SolutionDetailModalComponent from './modals/solution-detail-modal.component';
import ToolDetailModalComponent from './modals/tool-detail-modal.component';

interface Tool {
 name: string;
 description: string;
 icon: string;
 status: 'available' | 'coming-soon';
}

interface Solution {
 area: string;
 icon: string;
 color: string;
 description: string;
 tools: Tool[];
}

@Component({
 selector: 'app-solutions',
 standalone: true,
 imports: [
   CommonModule,
   MatCardModule,
   MatButtonModule,
   MatIconModule,
   MatTooltipModule
 ],
 template: `
   <section class="solutions-section py-24">
     <div class="container mx-auto px-6">
       <div class="text-center mb-16">
         <h2 class="text-4xl font-bold mb-6">Soluções Especializadas</h2>
         <p class="text-gray-600 text-xl max-w-3xl mx-auto">
           Ferramentas desenvolvidas especificamente para cada área de atuação
         </p>
       </div>

       <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
         @for (solution of solutions; track solution.area) {
           <mat-card class="solution-card">
             <mat-card-header>
               <div 
                 mat-card-avatar 
                 class="solution-icon"
                 [style.background-color]="solution.color + '15'"
                 [style.color]="solution.color"
               >
                 <mat-icon>{{solution.icon}}</mat-icon>
               </div>
               <mat-card-title class="text-2xl mb-3">{{solution.area}}</mat-card-title>
               <mat-card-subtitle class="text-base">{{solution.description}}</mat-card-subtitle>
             </mat-card-header>

             <mat-card-content>
               <div class="tools-wrapper mt-8">
                 <div class="tools-grid">
                   @for (tool of solution.tools; track tool.name) {
                     <div 
                       class="tool-item"
                       (click)="showToolDetails(tool, solution)"
                       (keydown.enter)="showToolDetails(tool, solution)"
                       tabindex="0"
                       role="button"
                     >
                       <div class="tool-content">
                         <mat-icon [style.color]="solution.color">{{tool.icon}}</mat-icon>
                         <div class="tool-text">
                           <h4>{{tool.name}}</h4>
                           @if (tool.status === 'coming-soon') {
                             <span class="coming-soon">Em breve</span>
                           }
                         </div>
                       </div>
                     </div>
                   }
                 </div>
               </div>
             </mat-card-content>

             <mat-card-actions align="end" class="mt-6">
               <button 
                 mat-raised-button
                 [style.backgroundColor]="solution.color"
                 class="see-more-button"
                 (click)="showDetails(solution)"
               >
                 Ver mais detalhes
                 <mat-icon class="ml-2">arrow_forward</mat-icon>
               </button>
             </mat-card-actions>
           </mat-card>
         }
       </div>
     </div>
   </section>
 `,
 styles: [`
   .solutions-section {
     background: var(--bg-primary);
   }

   .solution-card {
     height: 100%;
     transition: all 0.3s ease;
     border-radius: 16px;
     padding: 24px;
     border: none;
     background: var(--card-bg);
     box-shadow: 0 4px 20px var(--shadow-color);

     &:hover {
       transform: translateY(-8px);
       box-shadow: 0 8px 30px var(--shadow-color);
     }
   }

   .solution-icon {
     width: 56px;
     height: 56px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 14px;
     margin-bottom: 16px;

     mat-icon {
       font-size: 28px;
       width: 28px;
       height: 28px;
     }
   }

   .tools-wrapper {
     background: var(--bg-secondary);
     border-radius: 12px;
     padding: 20px;
   }

   .tools-grid {
     display: grid;
     grid-template-columns: repeat(2, 1fr);
     gap: 16px;
   }

   .tool-item {
     background: var(--card-bg);
     padding: 16px;
     border-radius: 10px;
     transition: all 0.2s ease;
     cursor: pointer;

     &:hover {
       transform: translateY(-4px);
       box-shadow: 0 4px 12px var(--shadow-color);
     }

     &:focus {
       outline: 2px solid var(--primary-color);
       outline-offset: 2px;
     }
   }

   .tool-content {
     display: flex;
     align-items: center;
     gap: 12px;

     mat-icon {
       font-size: 24px;
       width: 24px;
       height: 24px;
     }
   }

   .tool-text {
     h4 {
       font-size: 1rem;
       font-weight: 500;
       margin-bottom: 4px;
       color: var(--text-primary);
     }
   }

   .coming-soon {
     display: inline-block;
     background: var(--bg-secondary);
     color: var(--primary-color);
     padding: 4px 8px;
     border-radius: 12px;
     font-size: 0.75rem;
     font-weight: 500;
   }

   .see-more-button {
     color: white;
     padding: 8px 24px;
     font-weight: 500;
     border-radius: 8px;
     display: flex;
     align-items: center;
   }

   @media (max-width: 768px) {
     .tools-grid {
       grid-template-columns: 1fr;
     }
   }

   @media (max-width: 640px) {
     .solution-card {
       padding: 16px;
     }
   }
 `]
})
export default class SolutionsComponent {
  solutions: Solution[] = [
    {
      area: 'Contabilidade',
      icon: 'account_balance',
      color: '#2196F3',
      description: 'Automação e gestão completa para escritórios contábeis',
      tools: [
        {
          name: 'Automação Fiscal',
          description: 'Gestão automática de obrigações fiscais e declarações',
          icon: 'receipt_long',
          status: 'available'
        },
        {
          name: 'Folha de Pagamento',
          description: 'Cálculos automáticos e gestão de folha',
          icon: 'groups',
          status: 'available'
        },
        {
          name: 'Contabilidade Digital',
          description: 'Integração com sistemas e bancos',
          icon: 'cloud_sync',
          status: 'available'
        },
        {
          name: 'IA Contábil',
          description: 'Análise inteligente de documentos e lançamentos',
          icon: 'psychology',
          status: 'coming-soon'
        }
      ]
    },
    {
      area: 'Advocacia',
      icon: 'gavel',
      color: '#4CAF50',
      description: 'Soluções completas para escritórios de advocacia',
      tools: [
        {
          name: 'Gestão Processual',
          description: 'Controle completo de processos e prazos',
          icon: 'work',
          status: 'available'
        },
        {
          name: 'Automação de Documentos',
          description: 'Geração automática de peças e contratos',
          icon: 'description',
          status: 'available'
        },
        {
          name: 'Agenda Jurídica',
          description: 'Controle de compromissos e prazos',
          icon: 'event',
          status: 'available'
        },
        {
          name: 'Análise Jurisprudencial IA',
          description: 'Pesquisa inteligente de jurisprudência',
          icon: 'psychology',
          status: 'coming-soon'
        }
      ]
    },
    {
      area: 'Engenharia Civil',
      icon: 'engineering',
      color: '#FF5722',
      description: 'Ferramentas especializadas para projetos e obras',
      tools: [
        {
          name: 'Gestão de Obras',
          description: 'Controle completo de projetos e execução',
          icon: 'construction',
          status: 'available'
        },
        {
          name: 'Calculadoras Técnicas',
          description: 'Conjunto de calculadoras especializadas',
          icon: 'calculate',
          status: 'available'
        },
        {
          name: 'Orçamentos',
          description: 'Orçamentos detalhados e precisos',
          icon: 'attach_money',
          status: 'available'
        },
        {
          name: 'BIM Integration',
          description: 'Integração com sistemas BIM',
          icon: 'view_in_ar',
          status: 'coming-soon'
        }
      ]
    },
    {
      area: 'Escritórios em Geral',
      icon: 'business',
      color: '#673AB7',
      description: 'Soluções administrativas para qualquer escritório',
      tools: [
        {
          name: 'Gestão Financeira',
          description: 'Controle financeiro completo',
          icon: 'account_balance_wallet',
          status: 'available'
        },
        {
          name: 'CRM',
          description: 'Gestão de relacionamento com clientes',
          icon: 'people',
          status: 'available'
        },
        {
          name: 'Documentos',
          description: 'Gestão documental inteligente',
          icon: 'folder',
          status: 'available'
        },
        {
          name: 'Automação de Marketing',
          description: 'Marketing digital automatizado',
          icon: 'campaign',
          status: 'coming-soon'
        }
      ]
    }
  ];

  constructor(private dialog: MatDialog) {}

showToolDetails(tool: Tool, solution: Solution) {
  const dialogRef = this.dialog.open(ToolDetailModalComponent, {
    data: { tool, color: solution.color },
    width: '700px',
    maxWidth: '800%',
    panelClass: 'tool-modal',
    hasBackdrop: false // Remove backdrop escuro
  });

   dialogRef.afterClosed().subscribe(result => {
     if (result === 'trial') {
       console.log('Iniciar trial para:', tool.name);
     }
   });
 }

 showDetails(solution: Solution) {
   const dialogRef = this.dialog.open(SolutionDetailModalComponent, {
     data: solution,
     width: '700%',
     maxWidth: '800px',
     panelClass: 'solution-modal'
   });

   dialogRef.afterClosed().subscribe(result => {
     if (result === 'trial') {
       console.log('Iniciar trial para:', solution.area);
     }
   });
 }
}