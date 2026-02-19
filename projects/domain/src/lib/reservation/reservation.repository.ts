import { Reservation } from "./reservation.model";

export abstract class ReservationRepository {
    abstract createReservation(reservation: Reservation): Promise<Reservation>;
    abstract getReservations(): Promise<Reservation[]>;
}
