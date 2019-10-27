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

  monthFrom: any;
  monthTo: any;
  yearFrom: any;
  yearTo: any;

  dataset: any;

  constructor() { }

  ngOnInit() {

    this.fromfirstMonth = new Date(new Date().getFullYear(), 0, 1);
    this.fromlastMonth = new Date();
    this.tofirstMonth = new Date();
    this.tolastMonth = new Date(new Date().getFullYear(), 11, 31);

    this.dateFrom = this.fromfirstMonth;
    this.dateTo = this.tolastMonth;

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: this.getDataset(this.dateFrom, this.dateTo)
    };
  }

  onSearch($event: any) {
    this.getDataset(this.dateFrom, this.dateTo);
  }

  getDataset(dateFrom: any, dateTo: any) {

    this.monthFrom = dateFrom.getMonth();
    this.yearFrom = dateFrom.getFullYear();

    this.monthTo = dateTo.getMonth();
    this.yearTo = dateTo.getFullYear();


    console.log(this.monthFrom);
    console.log(this.yearFrom);

    console.log(this.monthTo);
    console.log(this.yearTo);


    this.dataset =
    [
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
    ];
    return this.dataset;
  }
}
