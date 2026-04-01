import { Injectable } from '@angular/core';
import { Reservation } from '@domain';
import { ReservationRepository } from '@domain';
import { Observable } from 'rxjs';
import { ApiService } from '../../public-api';

@Injectable({
  providedIn: 'root',
})
export class ReservationApiService extends ApiService implements ReservationRepository {

    createReservation(payload: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>('/reservations', payload)
    }

    getReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>('/reservations')
    }

    getReservationsByRef(ref: string): Observable<{success: boolean, data: Reservation}> {
        return this.http.get<{success: boolean, data: Reservation}>(`${this.baseUrl}/bookings/ref/${ref}`);
    }
  
}
