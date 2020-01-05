import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {ChartBills} from '../../interfaces/chart-bills';

@Component({
  selector: 'app-chart-bills',
  templateUrl: './chart-bills.component.html',
  styles: ['']
})
export class ChartBillsComponent implements OnInit {

  dateFrom: any;
  fromfirstMonth: any;
  fromlastMonth: any;
  chart: ChartBills[];
  cols: any;
  month: any;
  year: any;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.dateFrom = new Date();
    this.onSearch();
    this.cols = [
      { field: 'month_name', header: 'Month' },
      { field: 'year', header: 'Year' },
      { field: 'amount', header: 'Amount in €' },
      { field: 'crby', header: 'User' },
    ];
  }

  onSearch() {
    this.chart = null;
    //+1 needed because Janaury = 0 in frontend and in backend we have January = 1
    this.month = this.dateFrom.getMonth() + 1;
    this.year = this.dateFrom.getFullYear();
    this.route.params.subscribe(params => {
      this.dataService.getBillChart(this.month, this.year).subscribe(chart => {
        this.chart = chart;
      });
    });
  }
}

