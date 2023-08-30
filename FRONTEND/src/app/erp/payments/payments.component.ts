import { Component } from '@angular/core';
import Payment from 'src/app/models/Payment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  deletingRes = -1;

  payments: Array<Payment> = [];

  delete(event: string){

  }

}
