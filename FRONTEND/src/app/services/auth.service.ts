import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from './util/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private storage: Storage) { }

  async login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      }).subscribe((res:any) => {
        console.log(res);
        if(res.token){
          this.storage.setItem("token", res.token);
          resolve(res);
        }else{
          reject("Error: Unauthorized");
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  getAuthStatus(){
    try{
      this.storage.getItem("token");
      return true;
    }catch{
      return false;
    }
  }

  logout(){
    try{
      this.storage.removeItem("token");
      return true;
    }catch{
      return false;
    }
  }

}
