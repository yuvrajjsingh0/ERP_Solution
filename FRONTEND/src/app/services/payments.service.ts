import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Payment from '../models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private httpClient: HttpClient) { }

  async getPayments(){
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/payments').subscribe((res) => {
        resolve((res as Array<Payment>));
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putPayment(payment: Payment){
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8000/api/payments', payment).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async editPayment(payment: Payment){
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:8000/api/payments/'+payment.id, payment).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async deletePayment(paymentId: number){
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://localhost:8000/api/payments/'+paymentId).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }
}
