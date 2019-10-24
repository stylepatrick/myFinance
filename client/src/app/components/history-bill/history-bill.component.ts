import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-bill',
  templateUrl: './history-bill.component.html',
  styles: ['']
})
export class HistoryBillComponent implements OnInit {
  sum: any;
  cols: any;
  billentries: any;
  dateFrom: any;

  constructor() { }

  ngOnInit() {
    this.sum = 0;

    this.cols = [
      { field: 'value', header: 'Amount in €' },
      { field: 'crdt', header: 'Created' },
      { field: 'note', header: 'Note' },
    ];
  }

  onSearch($event: any) {

  }
  
}
