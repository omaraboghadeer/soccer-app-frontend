import { Observable } from "rxjs";
import { Reservation } from "./reservation.model";

export interface ReservationRepository {
    createReservation(reservation: Reservation): Observable<Reservation>;
    getReservations(): Observable<Reservation[]>;
    getReservationsByRef(ref: string): Observable<{success: boolean, data: Reservation}>;
}
