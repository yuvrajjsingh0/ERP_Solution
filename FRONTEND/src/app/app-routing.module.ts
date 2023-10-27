import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ErpComponent } from './erp/erp.component';
import { DashboardComponent } from './erp/dashboard/dashboard.component';
import { PaymentsComponent } from './erp/payments/payments.component';
import { WorkersComponent } from './erp/workers/workers.component';
import { ClientsComponent } from './erp/clients/clients.component';
import { PackagesComponent } from './erp/packages/packages.component';
import { ClientComponent } from './erp/client/client.component';
import { AuthGuard } from './services/auth.guard';
import { WorkerPayoutsComponent } from './erp/worker-payouts/worker-payouts.component';
import { PaymentComponent } from './erp/payment/payment.component';

const routes: Routes = [
  {path: '', redirectTo: 'erp', pathMatch: 'full'},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'erp', component: ErpComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'clients', component: ClientsComponent},
    {path: 'clients/:clientId', component: ClientComponent},
    {path: 'payments', component: PaymentsComponent},
    {path: 'payment', component: PaymentComponent},
    {path: 'workers', component: WorkersComponent},
    {path: 'workers/:workerId', component: WorkerPayoutsComponent},
    {path: 'packages', component: PackagesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
