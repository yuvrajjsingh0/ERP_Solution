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
import { HttpClientModule } from '@angular/common/http';
import { DeleteModalComponent } from './erp/delete-modal/delete-modal.component';
import { ClientComponent } from './erp/client/client.component';
import { AuthGuard } from './services/auth.guard';

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
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
