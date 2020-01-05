import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import { RandomColor } from 'angular-randomcolor';

@Component({
  selector: 'app-chart-bills',
  templateUrl: './chart-salary.component.html',
  styles: ['']
})
export class ChartSalaryComponent implements OnInit {

  data: any;
  chart: Array<any> = [];
  dataset: Array<any> = [];

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.dataService.getSlaveUser().subscribe(user => {
        for (let i = 0; i <= user.length - 1; i++) {
          this.dataService.getSalaryChart(user[i]).subscribe(chart => {
            this.chart.push({
              chart: chart,
              name: user[i],
            });
          });
        }
        setTimeout(() => {
            this.loadChart();
          },
          1500);
      });
    });
  }

  loadChart() {

    for (let i = 0; i <= this.chart.length - 1; i++) {
      this.dataset.push({
        label: this.chart[i].name,
        data: this.chart[i].chart,
        fill: false,
        borderColor: RandomColor.generateColor()
      });

      console.log(this.dataset);

      if (i === this.chart.length - 1) {
        this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: this.dataset
        };
      }
    }
  }
}
