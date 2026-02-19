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
            }
        ]
    }
];
