import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-detail-salary',
  templateUrl: './detail-salary.component.html',
  styles: ['']
})
export class DetailSalaryComponent implements OnInit {

  cols: any;
  details: any;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.dataService.getDetailSalary().subscribe(details => {
        this.details = details;
      });
    });

    this.cols = [
      { field: 'sum', header: 'SUM' },
      { field: 'max', header: 'MAX' },
      { field: 'min', header: 'MIN' },
      { field: 'avg', header: 'AVG' },
      { field: 'year', header: 'Year' },
      { field: 'crby', header: 'User' },
    ];
  }

}
