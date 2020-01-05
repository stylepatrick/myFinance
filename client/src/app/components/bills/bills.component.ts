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
  sum: number;


  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.sum = 0;
    this.route.params.subscribe(params => {
      this.dataService.getBillEntriesCurrentMonth().subscribe(billentries => {
        this.billentries = billentries;
        for (let i = 0; i <= billentries.length - 1; i++) {
          this.sum = this.sum + parseFloat(String(billentries[i].value));
        }
      });
    });

    this.cols = [
      { field: 'value', header: 'Amount in €' },
      { field: 'crdt', header: 'Created' },
      { field: 'note', header: 'Note' },
    ];
  }
}
