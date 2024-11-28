// src/app/components/home/features/features.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <section class="features-section py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Ferramentas Especializadas</h2>
          <p class="text-gray-600 max-w-3xl mx-auto">
            Soluções completas para automatizar e otimizar seu trabalho
          </p>
        </div>

        <!-- Categorias de Ferramentas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Calculadoras de Engenharia -->
          <mat-card class="feature-card">
            <mat-card-header>
              <mat-icon mat-card-avatar class="text-blue-500">calculate</mat-icon>
              <mat-card-title>Calculadoras Técnicas</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p class="mb-4">Ferramentas especializadas para cálculos precisos:</p>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Calculadora de INSS Obra
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Orçamentos de Pintura
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Cálculos de Reforma
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Dimensionamento Elétrico
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Estimativas de Materiais
                </li>
              </ul>
            </mat-card-content>
          </mat-card>

          <!-- Gestão de Projetos -->
          <mat-card class="feature-card">
            <mat-card-header>
              <mat-icon mat-card-avatar class="text-purple-500">architecture</mat-icon>
              <mat-card-title>Gestão de Projetos</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p class="mb-4">Controle total dos seus projetos:</p>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Cronogramas Interativos
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Gestão de Equipes
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Controle de Custos
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Relatórios Gerenciais
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Documentação Técnica
                </li>
              </ul>
            </mat-card-content>
          </mat-card>

          <!-- Documentação -->
          <mat-card class="feature-card">
            <mat-card-header>
              <mat-icon mat-card-avatar class="text-orange-500">description</mat-icon>
              <mat-card-title>Documentação Automática</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p class="mb-4">Geração e gestão de documentos:</p>
              <ul class="space-y-2">
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Geração de Propostas
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Contratos Personalizados
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  ARTs e RRTs
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Orçamentos Detalhados
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-green-500">check_circle</mat-icon>
                  Relatórios Técnicos
                </li>
              </ul>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Benefícios -->
        <div class="mt-16">
          <h3 class="text-2xl font-bold text-center mb-8">Benefícios do Sistema</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <mat-icon class="text-5xl text-blue-500 mb-4">speed</mat-icon>
              <h4 class="font-bold mb-2">Aumento de Produtividade</h4>
              <p class="text-gray-600">Automatize tarefas repetitivas e foque no que importa</p>
            </div>
            <div class="text-center">
              <mat-icon class="text-5xl text-green-500 mb-4">savings</mat-icon>
              <h4 class="font-bold mb-2">Redução de Custos</h4>
              <p class="text-gray-600">Otimize recursos e elimine desperdícios</p>
            </div>
            <div class="text-center">
              <mat-icon class="text-5xl text-purple-500 mb-4">psychology</mat-icon>
              <h4 class="font-bold mb-2">Decisões Inteligentes</h4>
              <p class="text-gray-600">Análises e relatórios para melhores decisões</p>
            </div>
            <div class="text-center">
              <mat-icon class="text-5xl text-orange-500 mb-4">verified</mat-icon>
              <h4 class="font-bold mb-2">Qualidade Garantida</h4>
              <p class="text-gray-600">Processos padronizados e controle de qualidade</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-16">
          <button mat-raised-button color="primary" class="text-lg px-8 py-3">
            Comece Gratuitamente
            <mat-icon class="ml-2">arrow_forward</mat-icon>
          </button>
          <p class="mt-4 text-gray-600">7 dias grátis, sem compromisso</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .feature-card {
      height: 100%;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    mat-icon {
      width: auto;
      height: auto;
    }
  `]
})
export default class FeaturesComponent {}