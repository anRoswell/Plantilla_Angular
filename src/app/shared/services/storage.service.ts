import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = sessionStorage;

  constructor() {}

  getStorage(key: string): any {
    try {
      const value = this.storage.getItem(key);
      return value ? JSON.parse(decodeURIComponent(escape(atob(value)))) : null;
    } catch {
      return null;
    }
  }

  postStorage(key: string, value: any, base64: boolean = false): void {
    this.storage.setItem(key, base64 ? value : btoa(unescape(encodeURIComponent(JSON.stringify(value)))));
  }

  deleteStorage(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
