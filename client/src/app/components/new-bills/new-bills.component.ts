import { Component, OnInit } from '@angular/core';
import {BillEntries} from '../../interfaces/bill-entries';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-new-bills',
  templateUrl: './new-bills.component.html',
  styles: ['']
})
export class NewBillsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private messageService: MessageService) { }

  amount: any;
  note: string;
  newBill: BillEntries;

  ngOnInit() {
  }

  onSaveButton($event: any) {
    this.newBill = {
      value: this.amount.replace(',', '.'),
      note: this.note
    };

    if (this.newBill.note === undefined) {
      this.newBill.note = null;
    }

    this.route.params.subscribe(params => {
      this.dataService.postNewBill(this.newBill).subscribe(result => {
        console.log(result);
        if (result[0].rowCreated === true) {
          this.messageService.add({severity:'success', summary: 'Bill created', detail:'Bill add'});
        }
        if (result[0].wrongInput === true) {
          this.messageService.add({severity:'error', summary: 'Wrong Input', detail:'Your bill is not saved'});
        }
      });
    });

    this.newBill = null;
    this.amount = null;
    this.note = null;
  }
}
