import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncdescService {

  constructor() { }

  decryptData(data: any) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, 'rentcard');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

    } catch (e) {
      return null;
    }
  }
  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(data, 'rentcard').toString();
    }
    catch (e) {

      return null;
    }
  }
}
