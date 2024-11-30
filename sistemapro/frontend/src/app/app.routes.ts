// app.routes.ts
import { Routes } from '@angular/router';
import { AccountingDashboardComponent } from './components/dashboard/sectors/accounting/accounting-dashboard.component';
import { BackupConfigComponent } from './components/dashboard/sectors/accounting/dialogs/backup-config/backup-config.component';
import { BankReconciliationConfigComponent } from './components/dashboard/sectors/accounting/dialogs/bank-reconciliation-config/bank-reconciliation-config.component';
import { InssSimulatorComponent } from './components/dashboard/sectors/accounting/dialogs/inss-simulator/inss-simulator.component';
import { NfeConfigComponent } from './components/dashboard/sectors/accounting/dialogs/nfe-config/nfe-config.component';
import { TaxConfigComponent } from './components/dashboard/sectors/accounting/dialogs/tax-config/tax-config.component';
import FeaturesComponent from './components/home/features/features.component';
import HomeComponent from './components/home/home.component';
import PricingComponent from './components/home/pricing/pricing.component';

export const routes: Routes = [
  // Rotas públicas (área da home)
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeComponent }, // Página inicial
      { path: 'pricing', component: PricingComponent },
      { path: 'features', component: FeaturesComponent },
      // ... outras páginas públicas
    ],
  },

  // Rotas da dashboard (área administrativa)
  {
    path: 'accounting',
    component: AccountingDashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AccountingDashboardComponent },
      { path: 'nfe', component: NfeConfigComponent },
      { path: 'bank', component: BankReconciliationConfigComponent },
      { path: 'tax', component: TaxConfigComponent },
      { path: 'backup', component: BackupConfigComponent },
      { path: 'inss', component: InssSimulatorComponent },
    ],
  },
];
