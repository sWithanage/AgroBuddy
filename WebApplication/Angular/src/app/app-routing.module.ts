import { Routes, RouterModule } from '@angular/router';

import { FullComponentAdmin } from './Admin/layouts/full/full.component';
import { FullComponentClient } from './Client/layouts/full/full.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { BlankComponent } from './Admin/layouts/blank/blank.component';
import {AllPlantsComponent} from './Admin/all-plants/all-plants.component';
import {PlantDetailsComponent} from './Admin/plant-details/plant-details.component';
import {ChangeModelComponent} from './Admin/ChangeModel/ChangeModel.component';
import {PredictiveDetailsComponent} from './Admin/predictiveDetails/predictiveDetails.component';
import {UserManagementComponent} from './Admin/user-management/user-management.component';
import {CultivatedAreasComponent} from './Admin/cultivated-areas/cultivated-areas.component';
import {PlantsComponent} from './Client/plants/plants.component';
import {ClientPlantDetailsComponent} from './Client/client-plant-details/client-plant-details.component';
import {CultivatedAreaComponent} from './Client/cultivated-area/cultivated-area.component';
import {ContactUsComponent} from './Client/contact-us/contact-us.component';
import {MarketPriceComponent} from './Client/market-price/market-price.component';
import {PlantFinderComponent} from './Client/plant-finder/plant-finder.component';


export const Approutes: Routes = [
  {
    path: 'admin',
    component: FullComponentAdmin,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./Admin/dashboards/dashboard.module').then(m => m.DashboardModule)
      },
       {
         path: 'plant',
         component: AllPlantsComponent,
         data: {
           title: 'Plants - AgroBuddy',
           urls: [
             { title: 'Dashboard', url: '/admin/dashboard' },
             { title: 'Plants' }
           ]
         }
       },
      {
        path: 'details',
        component: PlantDetailsComponent,
        data: {
          title: 'Plant Details - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/admin/dashboard' },
            { title: 'Plant Details' }
          ]
        }
      },
      {
        path: 'ModelDetails',
        component: PredictiveDetailsComponent,
        data: {
          title: 'Model Details - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/admin/dashboard' },
            { title: 'Model Details' }
          ]
        }
      },
      {
        path: 'ChangeModel',
        component: ChangeModelComponent,
        data: {
          title: 'Predictive Models - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/admin/dashboard' },
            { title: 'Predictive Models' }
          ]
        }
      },
      {
        path: 'userManagement',
        component: UserManagementComponent,
        data: {
          title: 'User Management - AgroBuddy',
          urls: [
            {title: 'Dashboard', url: '/admin/dashboard'},
            {title: 'User Management'}
          ]
        }
      },
      {
        path: 'cultivatedAreas',
        component: CultivatedAreasComponent,
        data: {
          title: 'Cultivated Areas - AgroBuddy',
          urls: [
            {title: 'Dashboard', url: '/admin/dashboard'},
            {title: 'Cultivated Areas'}
          ]
        }
      },
    ]
  },
  {
    path: 'client',
    component: FullComponentClient,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./Client/dashboards/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'plants',
        component: PlantsComponent,
        data: {
          title: 'Plants - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/client/dashboard' },
            { title: 'Plants' }
          ]
        }
      },
      {
        path: 'plantDetails',
        component: ClientPlantDetailsComponent,
        data: {
          title: 'Plant Details - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/client/dashboard' },
            { title: 'Plants Details' }
          ]
        }
      },
      {
        path: 'cultivatedArea',
        component: CultivatedAreaComponent,
        data: {
          title: 'Cultivated Area - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/client/dashboard' },
            { title: 'Cultivated Area' }
          ]
        }
      },
      {
        path: 'contactUs',
        component: ContactUsComponent,
        data: {
          title: 'Contact Us - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/client/dashboard' },
            { title: 'Contact Us' }
          ]
        }
      },
      {
        path: 'marketPrice',
        component: MarketPriceComponent,
        data: {
          title: 'Market Prices - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/client/dashboard' },
            { title: 'Market Prices' }
          ]
        }
      },
      {
        path: 'bestCrop',
        component: PlantFinderComponent,
        data: {
          title: 'Best Crop - AgroBuddy',
          urls: [
            { title: 'Dashboard', url: '/client/dashboard' },
            { title: 'Best Crop' }
          ]
        }
      }
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
