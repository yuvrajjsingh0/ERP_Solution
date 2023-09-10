import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Payment from '../models/Payment';
import { Storage } from './util/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage) { }

  async getPayments(client: string = ''): Promise<Array<Payment>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/payments?client='+client, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve((res as Array<Payment>));
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putPayment(payment: Payment){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8000/api/payments', payment, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async editPayment(payment: Payment){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:8000/api/payments/'+payment.id, payment, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async deletePayment(paymentId: number){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://localhost:8000/api/payments/'+paymentId, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }
}
