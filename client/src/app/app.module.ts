import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializer} from './app-init';
import {AppAuthGuard} from './guards/app.authguard';

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
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewBillsComponent } from './components/new-bills/new-bills.component';
import {FormsModule} from '@angular/forms';
import {KeyFilterModule} from 'primeng/keyfilter';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    BillsComponent,
    NewBillsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    TabMenuModule,
    TableModule,
    HttpClientModule,
    KeycloakAngularModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule,
    KeyFilterModule
  ],
  providers: [DataService,
    /*AppAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
