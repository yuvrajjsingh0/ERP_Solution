import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import Client from 'src/app/models/Client';
import Package from 'src/app/models/Package';
import Payment from 'src/app/models/Payment';
import { ClientsService } from 'src/app/services/clients.service';
import { PackagesService } from 'src/app/services/packages.service';
import { PaymentsService } from 'src/app/services/payments.service';
import { SessionStorageService } from 'src/app/services/util/session-storage.service';

import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService,
    private packageService: PackagesService,
    private paymentsService: PaymentsService,
    private sessStorage: SessionStorageService
  ){}

  contentLoaded: number = 20;

  isEditing: boolean = false;

  isAdding:boolean = false;
  isSaving: boolean = false;

  formErrors: Array<string> = ['', '', '', ''];
  alert = {
    status: 0,
    success: '',
    failure: ''
  };

  payments: Array<Payment> = [];
  client: Client | undefined;
  package: Package | undefined;

  // Form models
  mode: string = "";
  amount: string = "0";
  meta: string = "";
  fee: string = "0";
  tax: string = "0";
  lateFee: string = "0";
  amountDue: string = "0";
  total: string = "0";
  from: string  = "";
  to: string = "";

  editingPayment: Payment | undefined;

  deletingRes = -1

  nextPageUrl = '';

  ngOnInit() {
    this.paymentsService.reset();
    // try{
    //   this.payments = this.sessStorage.getItem("payments");
    // }catch(err) {
    //   console.log("err", err);
    // }

    initTE({ Datepicker, Input }, { allowReinits: true });

    const confirmDateOnSelect = document.getElementById('datepicker-close-without-confirmation');
    new Datepicker(confirmDateOnSelect, {
      confirmDateOnSelect: true,
    });
    // new Input(document.getElementById('floatingInput'));
    // new Input(document.getElementById('floatingInput1'));
    const confirmDateOnSelect1 = document.getElementById('datepicker-close-without-confirmation1');
    new Datepicker(confirmDateOnSelect1, {
      confirmDateOnSelect: true,
    });


    this.route.params.subscribe(async (params) => {
      console.log(params);
  
      if (params['clientId']) { 
        console.log(params['clientId']);

        this.paymentsService.getPaymentsClient(params['clientId']).then((res) => {
          this.payments = res;
          this.sessStorage.setItem("payments", this.payments);
          this.nextPageUrl = this.paymentsService.nextLink;
        }).catch(err => {
          console.log(err);
        });

        let clients: Array<Client> = [];
        try{
          clients = this.sessStorage.getItem("clients");
        }catch(err){
          console.log(err);
        }
        let clientIdx = clients.findIndex((obj:Client) => obj.id == params['clientId']);
        if(clientIdx != -1){
          console.log(this.client);
          this.client = clients[clientIdx];
        }

        if(this.client == undefined){
          await this.clientsService.getClient(params['clientId']).then((client) => {
            this.client = client;
            console.log(client)
            this.contentLoaded = 50;
          }).catch(err => console.log(err));
        }
        
        
        try{
          let packages = this.sessStorage.getItem("packages");
          let packageIdx = packages.findIndex((obj:Package) => obj.id == this.client?.package_id);
          if(packageIdx != -1){
            this.package = packages[packageIdx];
          }
        }catch(err){
          console.log(err);
        }

        this.packageService.getPackage(this.client?.package_id + '').then((packageRes) => {
          this.package = packageRes;
          this.contentLoaded = 100;
        }).catch(err => console.log(err));
        this.amount = '' + this.package?.price ?? 'NaN';
        this.contentLoaded = 100;

      }
    });
  
  }

  isLoadingMore = false;
  loadMore(){
    this.isLoadingMore = true;
    if(this.client != undefined){
      this.paymentsService.getPaymentsClient(this.client.id + '').then((res) => {
        this.payments = [...this.payments, ...res];
        this.isLoadingMore = false;
        this.nextPageUrl = this.paymentsService.nextLink;
      }).catch(err => {
        console.log(err);
        this.isLoadingMore = false;
      });
    }
  }

  savePayment(){

    console.log("From", this.from, "to", this.to);
    if(this.from == '' || this.from == undefined || this.to == '' || this.to == undefined){
      this.formErrors[2] = "Please select dates";
      return;
    }

    this.formErrors = ['', '', ''];
    if(this.mode == '' || this.mode == undefined){
      this.formErrors[0] = "Please enter payment mode";
      return;
    }

    if(this.amount == '' || this.amount == undefined){
      this.formErrors[1] = "Please enter payment amount";
      return;
    }
    console.log("From", this.from, "to", this.to);
    if(this.from == '' || this.from == undefined || this.to == '' || this.to == undefined){
      this.formErrors[2] = "Please select dates";
      return;
    }

    if(!this.isEditing){
      this.addNewPayment();
    }else{
      this.editPaymentSave();
    }
    
  }

  addNewPayment(){
    this.isSaving = true;

    const datePartsFrom = this.from.split("/");
    const datePartsTo = this.to.split("/");

    const dateFrom = new Date(+datePartsFrom[2], Number(datePartsFrom[1]) - 1, +datePartsFrom[0]);
    const dateTo = new Date(+datePartsTo[2], Number(datePartsTo[1]) - 1, +datePartsTo[0]);

    let payment: Payment = {
      mode: this.mode,
      amount: Number(this.amount),
      client_id: this.client?.id ?? -1,
      package_id: this.client?.package_id ?? -1,
      meta: this.meta ?? '',
      fee: Number(this.fee) ?? 0,
      tax: Number(this.tax) ?? 0,
      total: Number(this.total) ?? 0,
      late_fee: Number(this.lateFee) ?? 0,
      from: dateFrom.getTime() + '',
      to: dateTo.getTime() + '',
      due: Number(this.amountDue) ?? 0,
    };

    this.paymentsService.putPayment(payment).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Payment added successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      payment.id = res.id;
      this.payments.unshift(payment);

      this.mode = "";
      this.amount = "";
      this.meta = "";
      this.fee = "0";
      this.tax = "0";
      this.lateFee = "0";
      this.amountDue = "0";
      this.total = "0";
      this.from = "";
      this.to = "";
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while adding this payment.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      console.log(err);
    })
  }

  editPaymentSave() {
    this.isSaving = true;
    const datePartsFrom = this.from.split("/");
    const datePartsTo = this.to.split("/");

    const dateFrom = new Date(+datePartsFrom[2], Number(datePartsFrom[1]) - 1, +datePartsFrom[0]);
    const dateTo = new Date(+datePartsTo[2], Number(datePartsTo[1]) - 1, +datePartsTo[0]);
    let payment: Payment = {
      id: this.editingPayment?.id,
      mode: this.mode,
      amount: Number(this.amount),
      meta: this.meta ?? '',
      client_id: this.editingPayment?.client_id ?? -1,
      package_id: this.editingPayment?.package_id ?? -1,
      fee: Number(this.fee) ?? 0,
      tax: Number(this.tax) ?? 0,
      total: Number(this.total) ?? 0,
      late_fee: Number(this.lateFee) ?? 0,
      from: dateFrom.getTime() + '',
      to: dateTo.getTime() + '',
      due: Number(this.amountDue) ?? 0,
    };
    this.paymentsService.editPayment(payment).then((res:any) => {
      this.alert.status = 1;
      this.alert.success = "Payment modified successfully.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      
      let idx = this.payments.findIndex(obj => obj.id == this.editingPayment?.id);
      if(idx != -1){
        this.payments[idx] = payment;
      }

      this.mode = "";
      this.amount = "";
      this.meta = "";
      this.fee = "0";
      this.tax = "0";
      this.lateFee = "0";
      this.amountDue = "0";
      this.total = "0";
      this.from = "";
      this.to = "";
      console.log(res);
    }).catch(err => {
      this.alert.status = 1;
      this.alert.failure = "An error occurred while editing this payment.";
      setTimeout(() => {
        this.alert = {
          status: 0,
          success: '',
          failure: ''
        };
      }, 5000);
      this.isSaving = false;
      this.isAdding = false;
      this.isEditing = false;
      
      this.mode = "";
      this.amount = "";
      this.meta = "";
      this.fee = "0";
      this.tax = "0";
      this.lateFee = "0";
      this.amountDue = "0";
      this.total = "0";
      this.from = "";
      this.to = "";
      console.log(err);
    });
  }

  editPayment(payment: Payment){
    this.editingPayment = payment;
    this.isEditing = true;
    this.isAdding = true;

    this.mode = payment.mode;
    this.amount = payment.amount + '';
    this.meta = payment.meta ?? '';
    this.fee = (payment.fee) + '' ?? '0';
    this.tax = (payment.tax) + ''  ?? '0';
    this.total = (payment.total)  + '' ?? '0';
    this.lateFee = (payment.late_fee) + ''  ?? '0';
    this.from = (payment.from)? (new Date(+payment.from).getDate() + '/' + (1+ new Date(+payment.from).getMonth()) + 
      '/' + new Date(+payment.from).getFullYear()) : '';
    this.to = (payment.to)? (new Date(+payment.to).getDate() + '/' + (1+ new Date(+payment.to).getMonth()) + 
      '/' + new Date(+payment.to).getFullYear()) : '';
    this.amountDue = (payment.due) + ''  ?? '0';
  }

  delete(event: string){
    if(event == 'cancel'){
      this.deletingRes = -1;
    }else if(event == 'delete'){
      this.paymentsService.deletePayment(this.deletingRes).then((res) => {
        this.alert.status = 1;
        this.alert.success = "Payment deleted successfully.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        let idx = this.payments.findIndex(obj => obj.id == this.deletingRes);
        if(idx != -1){
          this.payments.splice(idx, 1);
        }
        this.deletingRes = -1;
      }).catch(err => {
        this.alert.status = 1;
        this.alert.failure = "An error occurred while deleting this payment.";
        setTimeout(() => {
          this.alert = {
            status: 0,
            success: '',
            failure: ''
          };
        }, 5000);
        console.log(err);
        this.deletingRes = -1;
      });
    }
  }

  updateDue(){
    this.amountDue = (Number(this.total) - Number(this.amount)) + '';
  }

  updateTotal(){
    this.total = (Number(this.fee) + Number(this.lateFee) + Number(this.tax)) + '';
  }

}
