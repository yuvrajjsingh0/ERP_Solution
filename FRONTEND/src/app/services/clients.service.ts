import { Injectable, resolveForwardRef } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import Client from '../models/Client';
import { Storage } from './util/storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private searchSource = new Subject<Array<Client> | undefined>();

  search$ = this.searchSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  async getClient(id: string): Promise<Client>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/clients/'+id, {
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

  public nextLink: string = "http://api.rohitshukla.hexane.co.in/api/clients";
  currentLink: string = "";
  async getClients(): Promise<Array<Client>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.nextLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res: any) => {
        if(res != null){
          console.log(res);
          this.currentLink = this.nextLink;
          this.nextLink = res.next_page_url;
          resolve((res.data as Array<Client>));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  async searchClients(query: string): Promise<Array<Client>>{
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.rohitshukla.hexane.co.in/api/clients/search?q=' + query, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token
        })
      }).subscribe((res: any) => {
        if(res != null){
          console.log("Search Results", res);
          resolve((res as Array<Client>));
        }
      }, (err)=> {
        reject(err);
      })
    });
  }

  reset(){
    this.nextLink = "http://api.rohitshukla.hexane.co.in/api/clients";
    this.currentLink = "";
  }

  async putClient(client: Client){
    let token = this.storage.getItem("token");
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.rohitshukla.hexane.co.in/api/clients', client, {
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
      this.httpClient.put('http://api.rohitshukla.hexane.co.in/api/clients/'+client.id, client, {
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
      this.httpClient.delete('http://api.rohitshukla.hexane.co.in/api/clients/'+clientId, {
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

  search(query: string){
    this.searchClients(query).then((res) => {
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
