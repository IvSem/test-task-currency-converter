import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService {
  constructor(private http: HttpClient) {}

  getAllCurrencyData() {
    let url = 'https://api.exchangerate.host/latest';
    return this.http.get(url);
  }

  getBaseCurrencyData(country: string) {
    let url = 'https://api.exchangerate.host/latest?base=' + country;
    return this.http.get(url);
  }

  getCurrentResult(from: string, to: string, amount: string) {
    let url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    return this.http.get(url);
  }
}
