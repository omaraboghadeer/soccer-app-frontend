import { IFieldModel, FieldSize } from "@domain";

export interface Reservation {
    id?: string;
    name: string;
    mobile: string;
    date: string;
    time: string;
    field: IFieldModel;       // reference to a field
    players: FieldSize;
    note?: string;
}
