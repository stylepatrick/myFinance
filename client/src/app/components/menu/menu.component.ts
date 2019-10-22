import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: ['']
})
export class MenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {label: 'Bills Overview', icon: 'fa fa-fw fa-bar-chart', routerLink: 'bills'},
      {label: 'Salary Overview', icon: 'fa fa-fw fa-book'}
    ];
  }

}
