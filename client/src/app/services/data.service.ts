import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillEntries} from '../interfaces/bill-entries';
import {KeycloakService} from 'keycloak-angular';

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

  public getBillEntries(): Observable<BillEntries[]> {
    const url = 'api/entries/' + this.auth.getUsername() + '';
    return this.http.get<BillEntries[]>(url, {headers: this.headers});
  }

  postNewBill(newBill: BillEntries): Observable<BillEntries[]> {
    if (newBill.note) {
      const url = 'api/new/' + this.auth.getUsername() + '/' + newBill.value + '/' + newBill.note;
      return this.http.get<BillEntries[]>(url, {headers: this.headers});
    } else {
      const url = 'api/new/' + this.auth.getUsername() + '/' + newBill.value;
      return this.http.get<BillEntries[]>(url, {headers: this.headers});
    }

  }
}
