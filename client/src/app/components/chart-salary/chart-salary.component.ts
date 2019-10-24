import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-bills',
  templateUrl: './chart-salary.component.html',
  styles: ['']
})
export class ChartSalaryComponent implements OnInit {

  data: any;
  dateFrom: any;
  dateTo: any;
  fromfirstMonth: any;
  fromlastMonth: any;
  tofirstMonth: any;
  tolastMonth: any;

  constructor() { }

  ngOnInit() {

    this.fromfirstMonth = new Date(new Date().getFullYear(), 0, 1);
    this.fromlastMonth = new Date();
    this.tofirstMonth = new Date();
    this.tolastMonth = new Date(new Date().getFullYear(), 11, 31);

    this.dateFrom = this.fromfirstMonth;
    this.dateTo = this.tolastMonth;

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
          data: [2000, 1900, 1800, null, 1850, 1700, 1800],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
  }

  onSearch($event: any) {
    
  }
}
