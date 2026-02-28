import { Routes } from '@angular/router';

export const RESERVATIONS_ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: '',
        loadComponent: () => import('./pages/list/list.page').then(p => p.ListPage)
    },
    {
        path: 'new',
        loadComponent: () => import('./pages/reservation-form/reservation-form').then(p => p.ReservationForm)
    },
];