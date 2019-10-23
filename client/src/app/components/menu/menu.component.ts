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
      {
        label: 'Bills', icon: 'pi pi-shopping-cart',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/newBill'
        },
          {
            label: 'Actual',
            icon: 'pi pi-eye',
            routerLink: '/bills'
          },
          {
            label: 'History',
            icon: 'pi pi-search'}
        ]
      },
      {
        label: 'Salary',
        icon: 'pi pi-money-bill',
        items: [
          {label: 'New', icon: 'pi pi-fw pi-plus'},
          {label: 'History', icon: 'pi pi-search'}
        ]
      },
      {
        label: 'Charts',
        icon: 'pi pi-chart-line',
        items: [
          {label: 'Salary', icon: 'pi pi-money-bill', routerLink: '/chartSalary'},
          {label: 'Bills', icon: 'pi pi-shopping-cart'}
        ]
      }
    ];


  }

}
