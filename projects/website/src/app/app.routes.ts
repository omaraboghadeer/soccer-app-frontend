import { Routes } from '@angular/router';
import { Layout } from './core/layouts/layout';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)
            },
            {
                path: 'booking',
                loadChildren: () => import('./pages/booking/booking.routes').then(r => r.routes)
            }
        ]
    }
];
