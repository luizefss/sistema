// integrations.component.ts
import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface Integration {
 name: string;
 logo: string;
 description: string;
 category: 'contabilidade' | 'juridico' | 'engenharia' | 'geral';
}

@Component({
 selector: 'app-integrations',
 standalone: true,
 imports: [CommonModule, MatCardModule, MatIconModule, MatTooltipModule],
 template: `
   <section class="integrations">
     <div class="container">
       <h2>Integrações Disponíveis</h2>
       <p class="section-subtitle">
         Conecte com suas ferramentas favoritas
       </p>

       <!-- Filtro de categorias -->
       <div class="category-filter">
         @for(category of categories; track category) {
           <button 
             class="filter-btn" 
             [class.active]="selectedCategory() === category"
             (click)="selectedCategory.set(category)"
           >
             {{getCategoryLabel(category)}}
           </button>
         }
       </div>

       <!-- Grid de Integrações -->
       <div class="integrations-grid">
         @for(integration of filteredIntegrations(); track integration.name) {
           <div class="integration-card" [matTooltip]="integration.description">
             <img [src]="integration.logo" [alt]="integration.name">
             <span>{{integration.name}}</span>
           </div>
         }
       </div>

       <!-- Destaque de Recursos -->
       <div class="features-highlight">
         <div class="feature">
           <mat-icon>sync</mat-icon>
           <h3>Sincronização Automática</h3>
           <p>Dados sempre atualizados entre sistemas</p>
         </div>
         <div class="feature">
           <mat-icon>security</mat-icon>
           <h3>Conexão Segura</h3>
           <p>Criptografia de ponta a ponta</p>
         </div>
         <div class="feature">
           <mat-icon>schedule</mat-icon>
           <h3>Setup Rápido</h3>
           <p>Configure em minutos</p>
         </div>
       </div>

       <!-- API Info -->
       <div class="api-info">
         <h3>API Aberta</h3>
         <p>Precisa de uma integração personalizada?</p>
         <div class="api-features">
           <div class="api-feature">
             <mat-icon>description</mat-icon>
             <span>Documentação completa</span>
           </div>
           <div class="api-feature">
             <mat-icon>code</mat-icon>
             <span>Exemplos de código</span>
           </div>
           <div class="api-feature">
             <mat-icon>support_agent</mat-icon>
             <span>Suporte técnico</span>
           </div>
         </div>
         <a href="/developers" mat-raised-button color="primary">
           Área do Desenvolvedor
         </a>
       </div>
     </div>
   </section>
 `,
 styles: [`
   .integrations {
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

   .category-filter {
     display: flex;
     justify-content: center;
     gap: 16px;
     margin-bottom: 32px;
   }

   .filter-btn {
     padding: 8px 16px;
     border: none;
     background: none;
     border-radius: 20px;
     cursor: pointer;
     transition: all 0.3s;

     &.active {
       background: #1976d2;
       color: white;
     }
   }

   .integrations-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
     gap: 24px;
     margin-bottom: 64px;
   }

   .integration-card {
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 16px;
     border-radius: 8px;
     background: white;
     box-shadow: 0 2px 4px rgba(0,0,0,0.1);
     transition: transform 0.3s;
     cursor: pointer;

     &:hover {
       transform: translateY(-5px);
     }

     img {
       width: 64px;
       height: 64px;
       object-fit: contain;
       margin-bottom: 12px;
     }

     span {
       text-align: center;
       font-size: 0.875rem;
     }
   }

   .features-highlight {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
     gap: 32px;
     margin-bottom: 64px;

     .feature {
       text-align: center;

       mat-icon {
         font-size: 48px;
         height: 48px;
         width: 48px;
         color: #1976d2;
         margin-bottom: 16px;
       }

       h3 {
         margin-bottom: 8px;
       }

       p {
         color: #666;
       }
     }
   }

   .api-info {
     text-align: center;
     padding: 48px;
     background: #f5f5f5;
     border-radius: 8px;

     h3 {
       font-size: 1.5rem;
       margin-bottom: 8px;
     }

     p {
       color: #666;
       margin-bottom: 32px;
     }
   }

   .api-features {
     display: flex;
     justify-content: center;
     gap: 32px;
     margin-bottom: 32px;

     .api-feature {
       display: flex;
       align-items: center;
       gap: 8px;

       mat-icon {
         color: #1976d2;
       }
     }
   }

   @media (max-width: 768px) {
     .category-filter {
       flex-wrap: wrap;
     }

     .api-features {
       flex-direction: column;
       align-items: center;
     }
   }
 `]
})
export default class IntegrationsComponent {
 private integrations: Integration[] = [
   // Contabilidade
   {
     name: 'Contador.IO',
     logo: 'assets/integrations/contador-io.png',
     description: 'Integração com sistema contábil',
     category: 'contabilidade'
   },
   {
     name: 'NFe.io',
     logo: 'assets/integrations/nfe-io.png',
     description: 'Emissão e gestão de notas fiscais',
     category: 'contabilidade'
   },
   // Jurídico
   {
     name: 'Projuris',
     logo: 'assets/integrations/projuris.png',
     description: 'Sistema de gestão jurídica',
     category: 'juridico'
   },
   {
     name: 'PJe',
     logo: 'assets/integrations/pje.png',
     description: 'Processo Judicial Eletrônico',
     category: 'juridico'
   },
   // Engenharia
   {
     name: 'AutoCAD',
     logo: 'assets/integrations/autocad.png',
     description: 'Integração com AutoCAD',
     category: 'engenharia'
   },
   // Gerais
   {
     name: 'Google Drive',
     logo: 'assets/integrations/google-drive.png',
     description: 'Armazenamento e sincronização',
     category: 'geral'
   },
   {
     name: 'Dropbox',
     logo: 'assets/integrations/dropbox.png',
     description: 'Armazenamento em nuvem',
     category: 'geral'
   }
 ];

 categories = ['todos', 'contabilidade', 'juridico', 'engenharia', 'geral'] as const;
 selectedCategory = signal<(typeof this.categories)[number]>('todos');

 getCategoryLabel(category: string): string {
   const labels = {
     todos: 'Todas',
     contabilidade: 'Contabilidade',
     juridico: 'Jurídico',
     engenharia: 'Engenharia',
     geral: 'Geral'
   };
   return labels[category as keyof typeof labels];
 }

 filteredIntegrations = computed(() => {
   if (this.selectedCategory() === 'todos') {
     return this.integrations;
   }
   return this.integrations.filter(i => i.category === this.selectedCategory());
 });
}