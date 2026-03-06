import { Routes } from '@angular/router';

export const RESERVATIONS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/my-reservation/my-reservation.page').then(p => p.MyReservationPage)
    },
    {
        path: 'new',
        loadComponent: () => import('./pages/reservation-form/reservation-form').then(p => p.ReservationForm)
    },
];