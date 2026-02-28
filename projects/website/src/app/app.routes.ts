import { Routes } from '@angular/router';
import { Layout } from './core/layouts/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: "home", pathMatch: 'full' },
            {
                path: 'home',
                loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
            },
            {
                path: 'reservations',
                loadChildren: () => import('./pages/reservations/reservations.routes').then(m => m.RESERVATIONS_ROUTES)
            }
        ]
    }
];
