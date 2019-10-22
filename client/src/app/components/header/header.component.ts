import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor(private auth: KeycloakService) { }

  ngOnInit() {
    this.username = this.auth.getUsername();
  }

  onLogout() {
    this.auth.logout();
  }
}
