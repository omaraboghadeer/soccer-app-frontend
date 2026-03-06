import { FieldModel, FieldSize } from "@domain/field/field.model";

export interface Reservation {
    id?: string;
    name: string;
    mobile: string;
    date: string;
    time: string;
    field: FieldModel;       // reference to a field
    players: FieldSize;
    note?: string;
}
