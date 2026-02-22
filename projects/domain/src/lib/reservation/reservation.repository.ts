import { Observable } from "rxjs";
import { Reservation } from "./reservation.model";

export abstract class ReservationRepository {
    abstract createReservation(reservation: Reservation): Observable<Reservation>;
    abstract getReservations(): Observable<Reservation[]>;
}
