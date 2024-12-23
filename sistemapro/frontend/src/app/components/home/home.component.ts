import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "../shared/layout/footer.component";
import { HeaderComponent } from "../shared/layout/header.component";
import ComparePlansComponent from "./compare-plans/compare-plans.component";
import FaqComponent from "./faq/faq.component";
import FeaturesComponent from "./features/features.component";
import IntegrationsComponent from "./integrations/integrations.component";
import PricingComponent from "./pricing/pricing.component";
import SolutionsComponent from "./solutions/solutions.component";
import SupportComponent from "./support/support.component";
import TestimonialsComponent from "./testimonials/testimonials.component";
import UseCasesComponent from "./use-cases/use-cases.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SolutionsComponent,
    CommonModule,
    RouterModule,
    MatButtonModule,
    FeaturesComponent,
    PricingComponent,
    TestimonialsComponent,
    ComparePlansComponent,
    FaqComponent,
    IntegrationsComponent,
    PricingComponent,
    SupportComponent,
    TestimonialsComponent,
    UseCasesComponent,
    HeaderComponent,
    FooterComponent,
  ],
  template: `
    <div class="home-layout">
      <app-header></app-header>
      <app-use-cases />
      <app-testimonials />
      <app-support />
      <app-pricing />
      <app-integrations />
      <app-compare-plans />
      <app-solutions />
      <app-features />
      <app-pricing />
      <app-testimonials />
      <app-faq />
      <app-footer></app-footer>
    </div>
  `,
})
export default class HomeComponent {}

