import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from './util/storage.service';
import WorkerPayout from '../models/WorkerPayout';

@Injectable({
  providedIn: 'root'
})
export class WorkerPayoutsService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  async getWorkerPayouts(): Promise<Array<WorkerPayout>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/worker-payouts', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res: any) => {
        if(res != null){
          console.log(res);
          resolve((res as Array<WorkerPayout>));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  async getWorkerPayoutsByWorker(worker: string = ''): Promise<Array<WorkerPayout>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/worker-payouts?worker='+worker, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve((res as Array<WorkerPayout>));
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putWorkerPayout(workerPayout: WorkerPayout){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.rohitshukla.hexane.co.in/api/worker-payouts', workerPayout, {
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

  async editWorkerPayout(workerPayout: WorkerPayout){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://api.rohitshukla.hexane.co.in/api/worker-payouts/'+workerPayout.id, workerPayout, {
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

  async deleteWorkerPayout(workerPayoutId: number){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://api.rohitshukla.hexane.co.in/api/worker-payouts/'+workerPayoutId, {
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
