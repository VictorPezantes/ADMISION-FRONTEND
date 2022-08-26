import { Route } from '@angular/router';
import { AuthResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';

export const authResetPasswordRoutes: Route[] = [
    {
        path     : ':token',
        component: AuthResetPasswordComponent
    }
];
