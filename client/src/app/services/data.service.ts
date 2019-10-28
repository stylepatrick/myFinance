import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillEntries} from '../interfaces/bill-entries';
import {KeycloakService} from 'keycloak-angular';
import {SalaryEntries} from '../interfaces/salary-entries';
import {ChartBills} from '../interfaces/chart-bills';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  headers = new HttpHeaders(
    {
      'Authorization': 'Basic ' + btoa('patrick:patrick')
    });

  constructor(private http: HttpClient,
              private auth: KeycloakService) { }

  public getBillEntriesCurrentMonth(): Observable<BillEntries[]> {
    const url = 'api/currentBills/' + this.auth.getUsername() + '';
    return this.http.get<BillEntries[]>(url, {headers: this.headers});
  }

  public getBillEntriesHistory(month: any, year: any): Observable<BillEntries[]> {
    const url = 'api/historyBills/' + this.auth.getUsername() + '/' + month + '/' + year + '';
    return this.http.get<BillEntries[]>(url, {headers: this.headers});
  }

  //ToDo find better solution for post with note and post without note
  postNewBill(newBill: BillEntries): Observable<any[]> {
    if (newBill.note) {
      const url = 'api/new/bill/' + this.auth.getUsername() + '/' + newBill.value + '/' + newBill.note;
      return this.http.get<any[]>(url, {headers: this.headers});
    } else {
      const url = 'api/new/bill/' + this.auth.getUsername() + '/' + newBill.value;
      return this.http.get<any[]>(url, {headers: this.headers});
    }
  }

  postNewSalary(newSalary: any):  Observable<any[]> {
      const url = 'api/new/salary/' + this.auth.getUsername() + '/' + newSalary.value;
      return this.http.get<any[]>(url, {headers: this.headers});
  }

  getBillChart(month: any, year: any): Observable<ChartBills[]> {
    const url = 'api/chartBills/' + this.auth.getUsername() + '/' + month + '/' + year;
    return this.http.get<ChartBills[]>(url, {headers: this.headers});
  }

  getSalaryChart(user: any): Observable<any[]> {
    const url = 'api/chartSalary/' + user;
    return this.http.get<any[]>(url, {headers: this.headers});
  }

  getSlaveUser(): Observable<any[]> {
    const url = 'api/slaveUser/' + this.auth.getUsername();
    return this.http.get<any[]>(url, {headers: this.headers});
  }

  getDetailSalary(): Observable<any[]> {
    const url = 'api/detailSalary/' + this.auth.getUsername();
    return this.http.get<any[]>(url, {headers: this.headers});
  }
}
