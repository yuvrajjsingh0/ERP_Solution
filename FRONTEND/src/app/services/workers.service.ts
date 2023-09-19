import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from './util/storage.service';
import Worker from '../models/Worker';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  async getWorker(id: string): Promise<Worker>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/workers/'+id, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res: any) => {
        if(res != null){
          console.log(res);
          resolve((res as Worker));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  async getWorkers(): Promise<Array<Worker>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/workers', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res: any) => {
        if(res != null){
          console.log(res);
          resolve((res as Array<Worker>));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putWorker(worker: Worker){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.rohitshukla.hexane.co.in/api/workers', worker, {
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

  async editWorker(worker: Worker){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://api.rohitshukla.hexane.co.in/api/workers/'+worker.id, worker, {
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

  async deleteWorker(workerId: number){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://api.rohitshukla.hexane.co.in/api/workers/'+workerId, {
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
