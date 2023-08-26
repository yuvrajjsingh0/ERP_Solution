import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ErpComponent,
    DashboardComponent,
    ClientsComponent,
    PackagesComponent,
    PaymentsComponent,
    WorkersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
