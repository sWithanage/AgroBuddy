import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/plant',
    title: 'Plant Details',
    icon: 'icon-Eci-Icon',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/cultivatedAreas',
    title: 'Culrivated Area',
    icon: 'icon-Pie-Chart2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/userManagement',
    title: 'User management',
    icon: 'icon-User',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/ModelDetails',
    title: 'Predictive Models',
    icon: 'icon-Bar-Chart',
    class: '',
    extralink: false,
    submenu: []
  }

];
