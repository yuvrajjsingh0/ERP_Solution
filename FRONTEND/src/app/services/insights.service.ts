import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from './util/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  totalNumberOfUsers: number = 0;
  totalNumberOfUsersChange: number = 0;

  totalPayments: number = 0;
  totalPaymentsChange: number = 0;

  paymentsByWeek: any;
  paymentsByMonth: any;

  getTotalNumberOfUsers(): Promise<number>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/insights/totalNumberOfUsers', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res:any) => {
        this.totalNumberOfUsers = Number(res.count);
        this.totalNumberOfUsersChange = Number(res.change);
        resolve(this.totalNumberOfUsers);
      }, (err)=> {
        reject(err);
      })
    });
  }

  getTotalPayments(): Promise<number>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/insights/totalPayments', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res:any) => {
        this.totalPayments = Number(res.count);
        this.totalPaymentsChange = Number(res.change);
        resolve(this.totalPayments);
      }, (err)=> {
        reject(err);
      })
    });
  }

  getPaymentsByWeek(){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/insights/paymentsByWeek', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res:any) => {
        this.paymentsByWeek = res;
        console.log(res);
        resolve(res);
      }, (err)=> {
        reject(err);
      })
    });
  }

  getPaymentsByMonth(){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/insights/paymentsByMonth', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res:any) => {
        console.log(res);
        this.paymentsByMonth = res;
        resolve(res);
      }, (err)=> {
        reject(err);
      })
    });
  }
}
