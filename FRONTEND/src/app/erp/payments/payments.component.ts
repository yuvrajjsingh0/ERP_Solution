import { Component, OnInit } from '@angular/core';
import Payment from 'src/app/models/Payment';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  deletingRes = -1;

  payments: Array<Payment> = [];

  alert = {
    status: 0,
    success: '',
    failure: ''
  };
  nextPageUrl = '';

  constructor(
    private paymentsService: PaymentsService
  ){}

  ngOnInit() {
    this.paymentsService.reset()
    this.paymentsService.getPayments().then((res) => {
      this.payments = res;
      this.nextPageUrl = this.paymentsService.nextLink;
    }).catch(err => {
      console.log(err);
    });
  }

  isLoadingMore = false;
  loadMore(){
    this.isLoadingMore = true;
    this.paymentsService.getPayments().then((res) => {
      this.isLoadingMore = false;
      this.payments = [...this.payments, ...res];
      this.nextPageUrl = this.paymentsService.nextLink;
    }).catch(err => {
      console.log(err);
      this.isLoadingMore = false;
    });
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

}
