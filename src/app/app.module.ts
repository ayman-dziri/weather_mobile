import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {NavbarComponent} from "./Components/navbar/navbar.component";

import {FormsModule} from "@angular/forms";
import {CurrentComponent} from "./Components/current/current.component";
import {HourlyComponent} from "./Components/hourly/hourly.component";
import {SidebarComponent} from "./Components/sidebar/sidebar.component";
import {SearchbarComponent} from "./Components/searchbar/searchbar.component";
import {DailyComponent} from "./Components/daily/daily.component";
import {SunRiseSetComponent} from "./Components/sun-rise-set/sun-rise-set.component";
import { HttpClientModule} from "@angular/common/http";
import {MapsComponent} from "./Components/maps/maps.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {NotificationModalComponent} from "./Components/notification-modal/notification-modal.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CurrentComponent,
    NotificationModalComponent,
    HourlyComponent,
    SidebarComponent,
    SearchbarComponent,
    DailyComponent,
    SunRiseSetComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
