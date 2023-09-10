import { Injectable, resolveForwardRef } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import Client from '../models/Client';
import { Storage } from './util/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
    ) { }

  async getClient(id: string): Promise<Client>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/clients/'+id, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve(res as Client);
      }, (err)=> {
        reject(err);
      })
    });
  }

  async getClients(): Promise<Array<Client>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/clients', {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res) => {
        resolve((res as Array<Client>));
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putClient(client: Client){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8000/api/clients', client, {
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

  async editClient(client: Client){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:8000/api/clients/'+client.id, client, {
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

  async deleteClient(clientId: number){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://localhost:8000/api/clients/'+clientId, {
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
