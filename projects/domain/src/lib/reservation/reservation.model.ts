import { Field } from "@domain/field/field.model";
import { PlayersCount } from "@domain/field/field.model";

export interface Reservation {
    id?: string;
    name: string;
    mobile: string;
    date: string;
    time: string;
    field: Field;       // reference to a field
    players: PlayersCount;
    note?: string;
}
