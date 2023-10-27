import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Client from 'src/app/models/Client';
import Package from 'src/app/models/Package';
import Payment from 'src/app/models/Payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  client!: Client;

  payment!: Payment;

  package!: Package;

  constructor(private router: Router){
    this.client = this.router.getCurrentNavigation()!.extras.state!['client'] as Client;
    this.payment = this.router.getCurrentNavigation()!.extras.state!['payment'] as Payment;
    this.package = this.router.getCurrentNavigation()!.extras.state!['package'] as Package;
  }

  ngOnInit(): void {
    // this.route.params.subscribe(async (params) => {
    //   this.client = params['client'];
    //   this.payment = params['payment'];
    //   this.package = params['package'];
    // });
  }

  toDateStr(date: string | undefined){
    if(date == undefined) return '';
    const d = new Date(Number(date));
    return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
  }

}
