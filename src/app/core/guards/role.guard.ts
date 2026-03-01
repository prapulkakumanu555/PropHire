import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const expectedRoles: Role[] = route.data['roles'];
    const currentUser = authService.currentUserValue;

    if (currentUser && expectedRoles.includes(currentUser.role)) {
        return true;
    }

    // Role not authorized, redirect to general dashboard or login
    return router.createUrlTree(['/']);
};
