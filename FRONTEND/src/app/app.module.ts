import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormsModule } from '@angular/forms';
import { ErpComponent } from './erp/erp.component';
import { DashboardComponent } from './erp/dashboard/dashboard.component';
import { ClientsComponent } from './erp/clients/clients.component';
import { PackagesComponent } from './erp/packages/packages.component';
import { PaymentsComponent } from './erp/payments/payments.component';
import { WorkersComponent } from './erp/workers/workers.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteModalComponent } from './erp/delete-modal/delete-modal.component';
import { ClientComponent } from './erp/client/client.component';
import { AuthGuard } from './services/auth.guard';
import { NumberToKPipe } from './pipes/number-to-k.pipe';
import { WorkerPayoutsComponent } from './erp/worker-payouts/worker-payouts.component';
import { PaymentComponent } from './erp/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ErpComponent,
    DashboardComponent,
    ClientsComponent,
    PackagesComponent,
    PaymentsComponent,
    WorkersComponent,
    DeleteModalComponent,
    ClientComponent,
    NumberToKPipe,
    WorkerPayoutsComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
