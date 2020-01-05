import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-history-bill',
  templateUrl: './history-bill.component.html',
  styles: ['']
})
export class HistoryBillComponent implements OnInit {
  sum: any;
  cols: any;
  billentries: any;
  month: any;
  year: any;
  dateFrom: any;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.sum = 0;

    this.cols = [
      { field: 'value', header: 'Amount in €' },
      { field: 'crdt', header: 'Created' },
      { field: 'note', header: 'Note' },
    ];
  }

  onSearch(event: any) {
    this.sum = 0;
    this.billentries = null;
    this.month = this.dateFrom.getMonth();
    this.year = this.dateFrom.getFullYear();

    //add +1 to month because Postgres starts with January = 1 and Angular with January = 0
    this.month = this.month + 1;

    this.route.params.subscribe(params => {
      this.dataService.getBillEntriesHistory(this.month, this.year).subscribe(billentries => {
        this.billentries = billentries;
        for (let i = 0; i <= billentries.length - 1; i++) {
          this.sum = this.sum + parseFloat(String(billentries[i].value));
        }
      });
    });
  }
}
