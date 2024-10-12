import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./plantilla/plantilla.routes').then((plantilla) => plantilla.PlantillaRoutes),
  },
];
