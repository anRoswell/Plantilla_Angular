import { Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'reportes',
    pathMatch: 'full',
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reports/reports.routes').then((reports) => reports.reportsRoutes),
  },
];
