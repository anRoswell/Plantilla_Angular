import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth-routes').then((auth) => auth.authRoutes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((dashboard) => dashboard.dashboardRoutes),
    canActivate: [AuthGuard],
  },
];
