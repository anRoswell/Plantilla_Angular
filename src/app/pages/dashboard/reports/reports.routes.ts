import { Routes } from '@angular/router';
import { ReportsComponent } from './reports.component'; // Importa el ReportsComponent
import { HomeComponent } from './home/home.component';

export const reportsRoutes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];
