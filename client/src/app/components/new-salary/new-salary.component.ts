import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-salary',
  templateUrl: './new-salary.component.html',
  styles: ['']
})
export class NewSalaryComponent implements OnInit {
  amount: any;

  constructor() { }

  ngOnInit() {
  }

  onSaveButton($event: any) {
    
  }
}
