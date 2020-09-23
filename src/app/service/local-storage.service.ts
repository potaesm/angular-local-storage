import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() {
    // Choose type of the storage
    // this.localStorage = window.sessionStorage;
    this.localStorage = window.localStorage;
  }
  get(key: string): Observable<any> {
    if (this.isLocalStorageSupported) {
      return new Observable((observer) => {
        observer.next({
          key,
          value: JSON.parse(this.localStorage.getItem(key)),
        });
      });
    }
    return null;
  }
  set(key: string, value: any): Observable<any> {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return new Observable((observer) => {
        observer.next({
          key,
          value,
        });
      });
    }
    return null;
  }
  remove(key: string): Observable<any> {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return new Observable((observer) => {
        observer.next({
          key,
          value: null,
        });
      });
    }
    return null;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
