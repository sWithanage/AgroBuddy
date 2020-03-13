import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
        }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
