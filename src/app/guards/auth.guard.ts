import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const token = storageService.getStorage('token');

  if (!token) {
    router.navigate(['auth/sign-in']);
    alert('Por favor valide sus credenciales.');
    return false;
  }

  return true;
};
