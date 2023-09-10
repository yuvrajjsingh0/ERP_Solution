import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage implements Storage {

  constructor() { }

  [name: string]: any;
  length: number = 0;

  key(index: number): string | null {
    throw new Error('Method not implemented.');
  }

  public setItem(key: string, data: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string): string {
    return JSON.parse(localStorage.getItem(key)!);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

}
