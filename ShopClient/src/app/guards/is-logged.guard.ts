import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const isLoggedGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  return inject(AuthService).isLoggedIn$.pipe(
    map((isLogged) => isLogged || router.createUrlTree([''])));
};
