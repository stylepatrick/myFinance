import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';
import {SalaryEntries} from '../../interfaces/salary-entries';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-new-salary',
  templateUrl: './new-salary.component.html',
  styles: ['']
})
export class NewSalaryComponent implements OnInit {
  amount: any;
  newSalary: SalaryEntries;

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSaveButton($event: any) {
    this.newSalary = {
      value: this.amount.replace(',', '.'),
    };

    this.route.params.subscribe(params => {
      this.dataService.postNewSalary(this.newSalary).subscribe(result => {
        if (result[0].salaryExistForThisMonth === true) {
          this.messageService.add({severity:'warn', summary: 'Salary already exist', detail:'You Salary already exist for this month'});
        }
        if (result[0].rowCreated === true) {
          this.messageService.add({severity:'success', summary: 'Salary created', detail:'Salary add for the current month'});
        }
        if (result[0].wrongInput === true) {
          this.messageService.add({severity:'error', summary: 'Wrong Input', detail:'Your Sarary is not saved'});
        }
      });
    });

    this.newSalary = null;
    this.amount = null;
  }
}
