import { Observable } from "rxjs";
import { FieldModel } from "./field.model";

export interface FieldRepository {
    getAllFields(): Observable<FieldModel[]>;
    getFieldsByGovernorate(govId: string): Observable<FieldModel[]>;
    getFieldsByCity(cityId: string): Observable<FieldModel[]>;
}
