import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reservation } from '@domain/reservation/reservation.model';
import { ReservationRepository } from '@domain/reservation/reservation.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationApiService extends ReservationRepository {
    private readonly http = inject(HttpClient);

    createReservation(payload: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>('/reservations', payload)
    }

    getReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>('/reservations')
    }
  
}
