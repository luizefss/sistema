// use-cases.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

interface UseCase {
  area: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
}

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <section class="use-cases-section">
      <div class="container mx-auto px-4 py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Soluções por Área</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Ferramentas específicas para cada tipo de escritório, desenvolvidas para 
            atender as necessidades únicas de cada área
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (useCase of useCases; track useCase.area) {
            <mat-card class="use-case-card h-full">
              <mat-card-header>
                <div mat-card-avatar class="avatar-icon">
                  <mat-icon [color]="'primary'">{{useCase.icon}}</mat-icon>
                </div>
                <mat-card-title>{{useCase.title}}</mat-card-title>
                <mat-card-subtitle>{{useCase.area}}</mat-card-subtitle>
              </mat-card-header>

              <mat-card-content class="mt-4">
                <p class="mb-4">{{useCase.description}}</p>
                <ul class="feature-list">
                  @for (feature of useCase.features; track feature) {
                    <li class="flex items-center gap-2 mb-2">
                      <mat-icon class="text-green-500" [inline]="true">check_circle</mat-icon>
                      <span>{{feature}}</span>
                    </li>
                  }
                </ul>
              </mat-card-content>

              <mat-card-actions align="end" class="mt-4">
                <a 
                  mat-raised-button 
                  color="primary"
                  [routerLink]="useCase.ctaLink"
                >
                  {{useCase.ctaLabel}}
                </a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .use-cases-section {
      background-color: #f8f9fa;
    }

    .use-case-card {
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    .use-case-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .avatar-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e3f2fd;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .feature-list {
      margin-top: 1rem;
      padding-left: 0;
      list-style: none;
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-actions {
      padding: 16px;
    }
  `]
})
export default class UseCasesComponent {
  useCases: UseCase[] = [
    {
      area: 'Contabilidade',
      icon: 'account_balance',
      title: 'Gestão Contábil Inteligente',
      description: 'Automatize processos contábeis e fiscal com nossas ferramentas especializadas.',
      features: [
        'Calculadora de impostos automatizada',
        'Geração de relatórios fiscais',
        'Integração com sistemas contábeis',
        'Dashboard financeiro personalizado'
      ],
      ctaLabel: 'Ver soluções contábeis',
      ctaLink: '/solucoes/contabilidade'
    },
    {
      area: 'Advocacia',
      icon: 'gavel',
      title: 'Automação Jurídica',
      description: 'Otimize a gestão do seu escritório de advocacia com ferramentas especializadas.',
      features: [
        'Gestão de processos jurídicos',
        'Controle de prazos automático',
        'Modelos de petições personalizáveis',
        'Agenda jurídica integrada'
      ],
      ctaLabel: 'Ver soluções jurídicas',
      ctaLink: '/solucoes/advocacia'
    },
    {
      area: 'Engenharia',
      icon: 'engineering',
      title: 'Soluções para Engenharia',
      description: 'Ferramentas especializadas para escritórios de engenharia e construção.',
      features: [
        'Calculadora de INSS obra',
        'Gestão de projetos de construção',
        'Controle de custos de obra',
        'Relatórios técnicos automáticos'
      ],
      ctaLabel: 'Ver soluções engenharia',
      ctaLink: '/solucoes/engenharia'
    }
  ];
}