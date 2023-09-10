import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements Storage {

  constructor() { }

  [name: string]: any;
  length: number = 0;

  key(index: number): string | null {
    throw new Error('Method not implemented.');
  }

  public setItem(key: string, data: any): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string): any {
    let item = sessionStorage.getItem(key);
    if(item == null){
      throw("Item Not Found");
    }else{
      return JSON.parse(item);
    }
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clear() {
    sessionStorage.clear();
  }
}
