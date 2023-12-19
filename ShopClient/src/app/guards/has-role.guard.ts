/* import { CanActivateChildFn, CanMatchFn } from '@angular/router'; */
import { Role } from '../models/roles.type';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

/* export const hasRoleGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
 */
export function hasRoleGuard(allowedRoles: Role[]) {
  return () => inject(AuthService).user$.pipe(
    map((user => Boolean(user && allowedRoles.includes(user.role)))),
    tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
  )
}