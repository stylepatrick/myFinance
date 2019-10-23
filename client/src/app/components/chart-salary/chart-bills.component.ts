import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-bills',
  templateUrl: './chart-bills.component.html',
  styles: ['']
})
export class ChartBillsComponent implements OnInit {

  data: any;
  dateFrom: any;
  dateTo: any;

  constructor() { }

  ngOnInit() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Patrick',
          data: [1800, 1900, 1750, 2000, 1980, 1600, 1750],
          fill: false,
          borderColor: 'green'
        },
        {
          label: 'Gaby',
          data: [2000, 1900, 1800, 1850, 1700, 1900, 1800],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
  }

  onSearch($event: any) {
    
  }
}
