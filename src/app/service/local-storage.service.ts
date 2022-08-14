import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() {
    // Choose type of the storage
    this.localStorage = window.sessionStorage;
    // this.localStorage = window.localStorage;
  }
  get(key: string): Observable<any> {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(key);
      if (!!item) {
        return new Observable(observer => {
          observer.next({
            key,
            value: JSON.parse(item),
          });
        });
      }
      return new Observable(_ => {});
    }
    return new Observable(_ => {});
  }
  set(key: string, value: any): Observable<any> {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return new Observable(observer => {
        observer.next({
          key,
          value,
        });
      });
    }
    return new Observable(_ => {});
  }
  remove(key: string): Observable<any> {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return new Observable(observer => {
        observer.next({
          key,
          value: null,
        });
      });
    }
    return new Observable(_ => {});
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
