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
      },
      {
        path: 'ModelDetails',
        component: PredictiveDetailsComponent
      },
      {
        path: 'ChangeModel',
        component: ChangeModelComponent

      },
      {
        path: 'userManagement',
        component: UserManagementComponent

      },
      {
        path: 'cultivatedAreas',
        component: CultivatedAreasComponent

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
        component: PlantsComponent

      },
      {
        path: 'plantDetails',
        component: ClientPlantDetailsComponent
      },
      {
        path: 'cultivatedArea',
        component: CultivatedAreaComponent
      },
      {
        path: 'contactUs',
        component: ContactUsComponent
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
