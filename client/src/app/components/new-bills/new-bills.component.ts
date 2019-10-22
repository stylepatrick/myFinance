import { Component, OnInit } from '@angular/core';
import {BillEntries} from '../../interfaces/bill-entries';

@Component({
  selector: 'app-new-bills',
  templateUrl: './new-bills.component.html',
  styles: ['']
})
export class NewBillsComponent implements OnInit {

  constructor() { }

  amount: any;
  note: string;
  date: any;
  newBill: BillEntries;

  ngOnInit() {
  }

  onSaveButton($event: any) {
    this.newBill = {
      value: this.amount,
      note: this.note,
      crdt: this.date
    };
  }
}
