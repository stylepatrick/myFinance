import { Component, OnInit } from '@angular/core';
import {BillEntries} from '../../interfaces/bill-entries';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styles: ['']
})
export class BillsComponent implements OnInit {

  billentries: BillEntries[];
  cols: any[];
  user: string;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.user = 'patrick';
    this.route.params.subscribe(params => {
      this.dataService.getBillEntries().subscribe(billentries => {
        this.billentries = billentries;
      });
    });

    this.cols = [
      { field: 'value', header: 'Value' },
      { field: 'crdt', header: 'Created' },
    ];
  }
}
