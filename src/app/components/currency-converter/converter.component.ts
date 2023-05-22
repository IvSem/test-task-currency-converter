import { Component, OnInit } from '@angular/core';
import { CurrencyDataService } from 'src/app/services/currency-data.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './converter.component.html',
})
export class CurrencyConverterComponent implements OnInit {
  amount: string = '1';
  convertedAmount: string;
  baseCurrency: string = 'USD';
  targetCurrency: string = 'UAH';
  exchangeRates: { [key: string]: any } = {};
  flag: boolean = false;

  currencies: string[] = ['UAH', 'USD', 'EUR'];

  constructor(private currencyService: CurrencyDataService) {}

  ngOnInit() {
    this.currencyService.getAllCurrencyData().subscribe((data: any) => {
      this.exchangeRates = data.rates;
      this.currencies = Object.keys(this.exchangeRates);
      this.changeInput('3');
    });
  }

  changeInput(type: string) {
    if (type === '1') {
      this.currencyService
        .getCurrentResult(this.baseCurrency, this.targetCurrency, this.amount)
        .subscribe((data: any) => {
          this.flag = false;
          this.convertedAmount = data.result;
        });
    }
    if (type === '2') {
      this.currencyService
        .getCurrentResult(
          this.targetCurrency,
          this.baseCurrency,
          this.convertedAmount
        )
        .subscribe((data: any) => {
          console.log('flag-true');
          this.flag = true;
          this.amount = data.result;
        });
    }
    if (type === '3') {
      if (this.baseCurrency === this.targetCurrency) {
        this.amount = this.convertedAmount;
        return;
      }
      this.currencyService
        .getCurrentResult(this.baseCurrency, this.targetCurrency, this.amount)
        .subscribe((data: any) => {
          this.convertedAmount = data.result;
        });
    }
    if (type === '4') {
      if (this.baseCurrency === this.targetCurrency && !this.flag) {
        this.convertedAmount = this.amount;
        return;
      }
      if (this.flag) {
        console.log('flag-active');
        this.currencyService
          .getCurrentResult(
            this.targetCurrency,
            this.baseCurrency,
            this.convertedAmount
          )
          .subscribe((data: any) => {
            this.amount = data.result;
          });
        return;
      }
      this.currencyService
        .getCurrentResult(this.baseCurrency, this.targetCurrency, this.amount)
        .subscribe((data: any) => {
          this.convertedAmount = data.result;
        });
    }
  }
}
