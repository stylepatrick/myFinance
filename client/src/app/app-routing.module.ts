import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {BillsComponent} from './components/bills/bills.component';
import {AppAuthGuard} from './guards/app.authguard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] } },
  { path: 'bills', component: BillsComponent, canActivate: [AppAuthGuard], data: { roles: ['MyFinance'] } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: false, useHash: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
