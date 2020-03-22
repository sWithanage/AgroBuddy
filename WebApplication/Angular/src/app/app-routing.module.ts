import { Routes, RouterModule } from '@angular/router';

import { FullComponentAdmin } from './Admin/layouts/full/full.component';
import { FullComponentClient } from './Client/layouts/full/full.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { BlankComponent } from './Admin/layouts/blank/blank.component';
import {AllPlantsComponent} from './Admin/all-plants/all-plants.component';
import {PlantDetailsComponent} from './Admin/plant-details/plant-details.component';


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
         component: AllPlantsComponent
       },
      {
        path: 'details',
        component: PlantDetailsComponent
      }
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
