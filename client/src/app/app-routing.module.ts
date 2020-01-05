import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BillsComponent} from './components/bills/bills.component';
import {AppAuthGuard} from './guards/app.authguard';
import {NewBillsComponent} from './components/new-bills/new-bills.component';
import {ChartSalaryComponent} from './components/chart-salary/chart-salary.component';
import {HistoryBillComponent} from './components/history-bill/history-bill.component';
import {ChartBillsComponent} from './components/chart-bills/chart-bills.component';
import {NewSalaryComponent} from './components/new-salary/new-salary.component';
import {DetailSalaryComponent} from './components/detail-salary/detail-salary.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'bills', component: BillsComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'newBill', component: NewBillsComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'chartSalary', component: ChartSalaryComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'historybills', component: HistoryBillComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'chartBills', component: ChartBillsComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'newSalary', component: NewSalaryComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'detailSalary', component: DetailSalaryComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: false, useHash: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
