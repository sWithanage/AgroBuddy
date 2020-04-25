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
import {AllPlantsComponent} from './Admin/all-plants/all-plants.component';
import {PlantDetailsComponent} from './Admin/plant-details/plant-details.component';
import {ChangeModelComponent} from './Admin/ChangeModel/ChangeModel.component';
import {PredictiveDetailsComponent} from './Admin/predictiveDetails/predictiveDetails.component';
import {UserManagementComponent} from './Admin/user-management/user-management.component';
import { ClientServiceService } from './client-service.service';
import { AdminServiceService } from './admin-service.service';
import {CultivatedAreasComponent} from './Admin/cultivated-areas/cultivated-areas.component';
import {ChartsModule} from 'ng2-charts';
import {CultivatedAreaComponent} from './Client/cultivated-area/cultivated-area.component';
import {PlantsComponent} from './Client/plants/plants.component';
import {ClientPlantDetailsComponent} from './Client/client-plant-details/client-plant-details.component';
import { ContactUsComponent } from './Client/contact-us/contact-us.component';
import { MarketPriceComponent } from './Client/market-price/market-price.component';
import { PlantFinderComponent } from './Client/plant-finder/plant-finder.component';
import { BuyersComponent } from './Client/buyers/buyers.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminBuyersComponent} from './Admin/admin-buyers/admin-buyers.component';
import { DiseasesComponent } from './Client/diseases/diseases.component';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};
const routes: Routes = [ {
  path: 'example-params/:first/:second',
  component: PlantDetailsComponent,
} ];

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
    AllPlantsComponent,
    PlantDetailsComponent,
    ChangeModelComponent,
    PredictiveDetailsComponent,
    UserManagementComponent,
    CultivatedAreasComponent,
    CultivatedAreaComponent,
    PlantsComponent,
    ClientPlantDetailsComponent,
    ContactUsComponent,
    MarketPriceComponent,
    PlantFinderComponent,
    BuyersComponent,
    ProfileComponent,
    AdminBuyersComponent,
    DiseasesComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot(Approutes, {useHash: false}),
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBUb3jDWJQ28vDJhuQZxkC0NXr_zycm8D0'}),
    RouterModule.forRoot(routes),
    ChartsModule,
  ],
  providers: [
    ClientServiceService,
    AdminServiceService,
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
