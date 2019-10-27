import { Component, OnInit } from '@angular/core';
import {BillEntries} from '../../interfaces/bill-entries';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-new-bills',
  templateUrl: './new-bills.component.html',
  styles: ['']
})
export class NewBillsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  amount: any;
  note: string;
  date: any;
  newBill: BillEntries;

  ngOnInit() {
  }

  onSaveButton($event: any) {
    this.newBill = {
      value: this.amount.replace(',', '.'),
      note: this.note,
      crdt: this.date
    };

    if(this.newBill.note === undefined) {
      this.newBill.note = null;
    }

    this.route.params.subscribe(params => {
      this.dataService.postNewBill(this.newBill).subscribe();
    });

    this.newBill = null;
    this.amount = null;
    this.note = null;
    this.date = null;
  }
}
