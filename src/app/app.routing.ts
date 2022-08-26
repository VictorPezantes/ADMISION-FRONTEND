import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';
import {EmpresaComponent} from './modules/admin/empresa/empresa.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch: 'full', redirectTo: 'empresa'},

    // Redirect signed in user to the '/empresa'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'empresa'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmacion-requerida',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module')
                    .then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'olvidar-contrasenia',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module')
                    .then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'restablecer-contrasenia',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module')
                    .then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'iniciar-sesion', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module')
                    .then(m => m.AuthSignInModule)
            },
            {
                path: 'registro', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module')
                    .then(m => m.AuthSignUpModule)
            },
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'cerrar-sesion',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
            {
                path: 'desbloquear-sesion',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'inicio',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
            {
                path: 'admision', loadChildren: () => import('app/modules/landing/admision/admision.module')
                    .then(m => m.AdmisionModule)
            }
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'example',
                loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)
            },
            {
                path: 'empresa',
                component: EmpresaComponent
            },
            {
                path: 'solicitud',
                loadChildren: () => import('app/modules/admin/solicitud/solicitud.module').then(m => m.SolicitudModule)
            },
            {
                path: 'recursos-humanos',
                children: [
                    {
                        path: 'admision',
                        loadChildren: () => import('app/modules/admin/admision/admision.module').then(m => m.AdmisionModule)
                    },
                    {
                        path: 'personal',
                        loadChildren: () => import('app/modules/admin/personal/personal.module').then(m => m.PersonalModule)
                    },
                ]
            },
        ]
    },
    // {path: '**', redirectTo: 'signed-in-redirect', pathMatch: 'full'},
    // {path: '404', redirectTo: 'signed-in-redirect', pathMatch: 'full'},
];
