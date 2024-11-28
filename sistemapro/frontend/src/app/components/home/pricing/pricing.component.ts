// src/app/components/home/pricing/pricing.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

interface PlanPrice {
  monthly: number;
  yearly: number;
}

interface Plan {
  id: string;
  name: string;
  price: PlanPrice;
  features: string[];
  isFeatured?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSlideToggleModule
  ],
  template: `
    <section class="pricing">
      <div class="container">
        <h2 class="text-center text-3xl font-bold mb-8">Escolha seu plano</h2>
        
        <div class="billing-toggle">
          <span [class.active]="!isYearly()">Mensal</span>
          <mat-slide-toggle 
            [checked]="isYearly()" 
            (change)="toggleBilling()">
          </mat-slide-toggle>
          <span [class.active]="isYearly()">Anual</span>
          <div class="discount-badge">
            Economia de 20%
          </div>
        </div>

        <div class="plans-grid">
          @for(plan of plans; track plan.id) {
            <mat-card [class.featured]="plan.isFeatured">
              @if(plan.isFeatured) {
                <div class="featured-badge">Mais Popular</div>
              }
              
              <mat-card-header>
                <mat-card-title>{{plan.name}}</mat-card-title>
                <mat-card-subtitle>
                  <div class="price">
                    <span class="currency">R$</span>
                    <span class="amount">
                      {{isYearly() ? (plan.price.yearly/12).toFixed(0) : plan.price.monthly.toFixed(0)}}
                    </span>
                    <span class="period">/mês</span>
                  </div>
                  @if(isYearly()) {
                    <div class="yearly-price">
                      R$ {{plan.price.yearly.toFixed(0)}} faturado anualmente
                    </div>
                  }
                </mat-card-subtitle>
              </mat-card-header>

              <mat-card-content>
                <ul class="features">
                  @for(feature of plan.features; track feature) {
                    <li>
                      <mat-icon color="primary">check</mat-icon>
                      <span>{{feature}}</span>
                    </li>
                  }
                </ul>
              </mat-card-content>

              <mat-card-actions>
                <button 
                  mat-raised-button
                  [color]="plan.isFeatured ? 'accent' : 'primary'"
                  (click)="selectPlan(plan)"
                >
                  Começar Agora
                </button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pricing {
      padding: 80px 0;
      background: #f5f5f5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .billing-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 32px 0;
      position: relative;

      .active {
        color: #1976d2;
        font-weight: 500;
      }

      .discount-badge {
        position: absolute;
        right: -100px;
        background: #4caf50;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.875rem;
      }
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 48px;
    }

    mat-card {
      position: relative;
      padding: 24px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      }

      &.featured {
        transform: scale(1.05);
        border: 2px solid #ff4081;

        &:hover {
          transform: scale(1.05) translateY(-5px);
        }
      }
    }

    .featured-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #ff4081;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.875rem;
    }

    .price {
      margin: 24px 0;
      
      .currency {
        font-size: 1.25rem;
        vertical-align: top;
        margin-right: 4px;
      }

      .amount {
        font-size: 3.5rem;
        font-weight: 700;
      }

      .period {
        color: #666;
        margin-left: 4px;
      }
    }

    .yearly-price {
      font-size: 0.875rem;
      color: #666;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 24px 0;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 16px;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }
    }

    mat-card-actions {
      padding: 16px;
      text-align: center;

      button {
        width: 100%;
        height: 48px;
        font-weight: 500;
      }
    }

    @media (max-width: 768px) {
      .plans-grid {
        grid-template-columns: 1fr;
      }

      mat-card.featured {
        transform: none;
        order: -1;
      }

      .billing-toggle {
        .discount-badge {
          position: static;
          margin-left: 8px;
        }
      }
    }
  `]
})
export default class PricingComponent {
  isYearly = signal<boolean>(false);

  plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: {
        monthly: 99,
        yearly: 948 // 79/mês
      },
      features: [
        'Até 2 usuários',
        '10GB de armazenamento',
        'Suporte por email',
        'Recursos básicos',
        'Atualizações gratuitas'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: {
        monthly: 199,
        yearly: 1908 // 159/mês
      },
      features: [
        'Até 5 usuários',
        '50GB de armazenamento',
        'Suporte prioritário',
        'Todos os recursos',
        'API disponível',
        'Integrações avançadas'
      ],
      isFeatured: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: {
        monthly: 399,
        yearly: 3828 // 319/mês
      },
      features: [
        'Usuários ilimitados',
        '500GB de armazenamento',
        'Suporte 24/7',
        'Recursos customizados',
        'API ilimitada',
        'Treinamento dedicado',
        'Manager exclusivo'
      ]
    }
  ];

  constructor(private router: Router) {}

  toggleBilling() {
    this.isYearly.update(value => !value);
  }

  selectPlan(plan: Plan) {
    // Implementar navegação para checkout com o plano selecionado
    this.router.navigate(['/checkout'], { 
      queryParams: { 
        plan: plan.id,
        billing: this.isYearly() ? 'yearly' : 'monthly'
      }
    });
  }
}