import { Component, OnInit } from '@angular/core';
import { CurrencyDataService } from './services/currency-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'currency-converter';
  UAH: string = 'UAH';
  USD: string = 'USD';
  EUR: string = 'EUR';
  uahToUsd: number;
  uahToEur: number;

  constructor(public currencyService: CurrencyDataService) {}

  ngOnInit() {
    this.getCurrentRates();
  }

  getCurrentRates() {
    this.currencyService
      .getBaseCurrencyData(this.UAH)
      .subscribe((data: any) => {
        const rates = data.rates;

        this.uahToUsd = Math.floor(+(1 / rates[this.USD]) * 100) / 100;

        this.uahToEur = Math.floor(+(1 / rates[this.EUR]) * 100) / 100;
      });
  }
}
