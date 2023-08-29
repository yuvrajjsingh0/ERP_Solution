import { Injectable, resolveForwardRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import Client from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  async getClients(): Promise<Array<Client>>{
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/clients').subscribe((res) => {
        resolve((res as Array<Client>));
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putClient(client: Client){
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8000/api/clients', client).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async editClient(client: Client){
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:8000/api/clients/'+client.id, client).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async deleteClient(clientId: number){
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://localhost:8000/api/clients/'+clientId).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }
}
