import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Payment from '../models/Payment';
import { Storage } from './util/storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private searchSource = new Subject<Array<Payment> | undefined>();

  search$ = this.searchSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  reset(){
    this.nextLink = "http://api.rohitshukla.hexane.co.in/api/payments";
    this.currentLink = "";
  }

  public nextLink: string = "http://api.rohitshukla.hexane.co.in/api/payments";
  currentLink: string = "";
  async getPayments(): Promise<Array<Payment>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.nextLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res:any) => {
        if(res != null){
          console.log(res);
          this.currentLink = this.nextLink;
          this.nextLink = res.next_page_url;
          resolve((res.data as Array<Payment>));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  async getPaymentsClient(client: string = ''): Promise<Array<Payment>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/payments?client='+client, {
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
      this.httpClient.post('http://api.rohitshukla.hexane.co.in/api/payments', payment, {
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
      this.httpClient.put('http://api.rohitshukla.hexane.co.in/api/payments/'+payment.id, payment, {
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
      this.httpClient.delete('http://api.rohitshukla.hexane.co.in/api/payments/'+paymentId, {
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

  async searchPayments(query: string): Promise<Array<Payment>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/payments/search?q=' + query, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res:any) => {
        if(res != null){
          console.log(res);
          resolve((res as Array<Payment>));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  search(query: string){
    this.searchPayments(query).then((res) => {
      this.searchSource.next(res);
    }).catch(err => {
      console.log(err);
      this.searchSource.error(err);
    });
  }

  cancelSearch(){
    this.searchSource.next(undefined);
  }
}
