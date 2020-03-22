import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { FullComponentClient } from './Client/layouts/full/full.component';
import { FullComponentAdmin } from './Admin/layouts/full/full.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './login/login.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {SignupComponent} from './signup/signup.component';
import {SidebarComponentAdmin} from './Admin/shared/sidebar/sidebar.component';
import {NavigationComponentAdmin} from './Admin/shared/header-navigation/navigation.component';
import {BreadcrumbComponentAdmin} from './Admin/shared/breadcrumb/breadcrumb.component';
import {SidebarComponentClient} from './Client/shared/sidebar/sidebar.component';
import {BreadcrumbComponentClient} from './Client/shared/breadcrumb/breadcrumb.component';
import {NavigationComponentClient} from './Client/shared/header-navigation/navigation.component';

import { UserManagementComponent } from './Admin/user-management/user-management.component';
import {AllPlantsComponent} from './Admin/all-plants/all-plants.component';
import {PlantDetailsComponent} from './Admin/plant-details/plant-details.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};
const routes: Routes = [ {
  path: 'example-params/:first/:second',
  component: PlantDetailsComponent,
} ]

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponentClient,
    SidebarComponentAdmin,
    NavigationComponentAdmin,
    BreadcrumbComponentAdmin,
    SidebarComponentClient,
    BreadcrumbComponentClient,
    NavigationComponentClient,
    FullComponentAdmin,
    // SidebarComponent,
    LoginComponent,
    SignupComponent,
    UserManagementComponent,
    AllPlantsComponent,
    PlantDetailsComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(Approutes, { useHash: false }),
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0' }),
    RouterModule.forRoot( routes ),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
