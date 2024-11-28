// src/app/components/home/testimonials/testimonials.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  area: string;
  quote: string;
  tools: string[];
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <section class="testimonials py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Veja como nossos clientes transformaram seus escritórios
          </p>
        </div>

        <div class="relative">
          <!-- Navegação -->
          <button 
            mat-icon-button 
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            (click)="prevSlide()"
          >
            <mat-icon>chevron_left</mat-icon>
          </button>

          <button 
            mat-icon-button 
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            (click)="nextSlide()"
          >
            <mat-icon>chevron_right</mat-icon>
          </button>

          <!-- Carousel -->
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500"
              [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'"
            >
              @for (testimonial of testimonials; track testimonial.id) {
                <div class="w-full flex-shrink-0 px-4 md:px-12">
                  <mat-card class="testimonial-card">
                    <mat-card-header>
                      <img 
                        mat-card-avatar 
                        [src]="testimonial.image" 
                        [alt]="testimonial.name"
                      >
                      <mat-card-title>{{testimonial.name}}</mat-card-title>
                      <mat-card-subtitle>
                        {{testimonial.role}} - {{testimonial.company}}
                      </mat-card-subtitle>
                    </mat-card-header>

                    <mat-card-content class="mt-4">
                      <!-- Rating -->
                      <div class="flex mb-4">
                        @for (star of [1,2,3,4,5]; track star) {
                          <mat-icon class="text-yellow-400">star</mat-icon>
                        }
                      </div>

                      <!-- Quote -->
                      <p class="text-gray-700 text-lg italic mb-6">
                        "{{testimonial.quote}}"
                      </p>

                      <!-- Tools -->
                      <div class="mt-4 pt-4 border-t">
                        <p class="text-sm text-gray-600 mb-2">
                          Ferramentas utilizadas:
                        </p>
                        <div class="flex flex-wrap gap-2">
                          @for (tool of testimonial.tools; track tool) {
                            <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                              {{tool}}
                            </span>
                          }
                        </div>
                      </div>
                    </mat-card-content>
                  </mat-card>
                </div>
              }
            </div>
          </div>

          <!-- Indicadores -->
          <div class="flex justify-center gap-2 mt-8">
            @for (testimonial of testimonials; track testimonial.id) {
              <button 
                mat-mini-fab 
                [color]="currentSlide === testimonial.id - 1 ? 'primary' : ''"
                (click)="goToSlide(testimonial.id - 1)"
              >
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonial-card {
      margin: 1rem auto;
      max-width: 600px;
      transition: transform 0.3s ease;
    }

    .testimonial-card:hover {
      transform: translateY(-5px);
    }

    mat-icon {
      transition: color 0.3s ease;
    }

    .text-yellow-400 {
      color: #fbbf24;
    }
  `]
})
export default class TestimonialsComponent {
  currentSlide = 0;
  autoPlayInterval: any;

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Eng. Carlos Silva',
      role: 'Diretor de Projetos',
      company: 'CS Engenharia',
      image: 'assets/images/testimonials/eng1.jpg',
      area: 'Engenharia',
      quote: 'A calculadora de INSS de obra automatizou nosso processo completamente. Economizamos horas de trabalho manual por semana.',
      tools: ['Calculadora INSS', 'Gestão de Projetos']
    },
    {
      id: 2,
      name: 'Maria Santos',
      role: 'Contadora Chefe',
      company: 'Contábil Express',
      image: 'assets/images/testimonials/cont1.jpg',
      area: 'Contabilidade',
      quote: 'As ferramentas de automação revolucionaram nossa forma de trabalhar. O suporte é excepcional.',
      tools: ['Automação Fiscal', 'Relatórios Automáticos']
    },
    {
      id: 3,
      name: 'Dr. André Mendes',
      role: 'Advogado',
      company: 'Mendes Advocacia',
      image: 'assets/images/testimonials/adv1.jpg',
      area: 'Direito',
      quote: 'O sistema simplificou muito nossa gestão de processos e prazos. Recomendo fortemente.',
      tools: ['Gestão de Processos', 'Controle de Prazos']
    }
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}