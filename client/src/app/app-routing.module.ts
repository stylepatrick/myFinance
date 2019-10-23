import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BillsComponent} from './components/bills/bills.component';
import {AppAuthGuard} from './guards/app.authguard';
import {NewBillsComponent} from './components/new-bills/new-bills.component';
import {ChartBillsComponent} from './components/chart-salary/chart-bills.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'bills', component: BillsComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'newBill', component: NewBillsComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ },
  { path: 'chartSalary', component: ChartBillsComponent, /*canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] }*/ }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: false, useHash: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
