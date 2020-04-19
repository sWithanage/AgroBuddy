import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard - AgroBuddy',
      urls: [
        { title: 'Dashboard', url: '/client/dashboard' },
        { title: 'Admin Panel' }
      ]
    }
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
