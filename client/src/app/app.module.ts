import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {TabMenuModule} from 'primeng/tabmenu';
import { BillsComponent } from './components/bills/bills.component';
import {DataService} from './services/data.service';
import {TableModule} from 'primeng/table';
import {HttpClientModule} from '@angular/common/http';

import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializer} from './app-init';
import {AppAuthGuard} from './guards/app.authguard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    BillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    TabMenuModule,
    TableModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [DataService,
    AppAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
