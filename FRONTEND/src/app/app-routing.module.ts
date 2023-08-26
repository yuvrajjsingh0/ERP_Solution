import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ErpComponent } from './erp/erp.component';
import { DashboardComponent } from './erp/dashboard/dashboard.component';
import { PaymentsComponent } from './erp/payments/payments.component';
import { WorkersComponent } from './erp/workers/workers.component';

const routes: Routes = [
  {path: 'auth', component: AuthenticationComponent},
  {path: 'erp', component: ErpComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'payments', component: PaymentsComponent},
    {path: 'workers', component: WorkersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
