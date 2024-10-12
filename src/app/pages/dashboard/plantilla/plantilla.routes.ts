import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantillaComponent } from './plantilla.component';

export const PlantillaRoutes: Routes = [
  {
    path: '',
    component: PlantillaComponent,
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
