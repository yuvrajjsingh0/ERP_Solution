import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Package from '../models/Package';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private httpClient: HttpClient) { }

  async getPackage(id: string): Promise<Package>{
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/packages/'+id).subscribe((res) => {
        resolve(res as Package);
      }, (err)=> {
        reject(err);
      })
    });
  }

  async getPackages(): Promise<Array<Package>>{
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:8000/api/packages').subscribe((res) => {
        resolve(res as Array<Package>);
      }, (err)=> {
        reject(err);
      })
    });
  }

  async putPackage(packageT: Package){
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8000/api/packages', packageT).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async editPackage(packageT: Package){
    return new Promise((resolve, reject) => {
      this.httpClient.put('http://localhost:8000/api/packages/'+packageT.id, packageT).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  async deletePackage(packageId: number){
    return new Promise((resolve, reject) => {
      this.httpClient.delete('http://localhost:8000/api/packages/'+packageId).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }
}
