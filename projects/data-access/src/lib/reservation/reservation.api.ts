import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Reservation } from '@domain/reservation/reservation.model';
import { ReservationRepository } from '@domain/reservation/reservation.repository';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationApiService extends ReservationRepository {
    private readonly http = inject(HttpClient);

    async createReservation(payload: Reservation): Promise<Reservation> {
        return lastValueFrom(this.http.post<Reservation>('/reservations', payload))
    }

    async getReservations(): Promise<Reservation[]> {
        return lastValueFrom(this.http.get<Reservation[]>('/reservations'))
    }
  
}
