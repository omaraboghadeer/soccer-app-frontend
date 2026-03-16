import { Observable } from "rxjs";
import { IFieldModel } from "./field.model";

export interface FieldRepository {
    getAllFields(): Observable<IFieldModel[]>;
    getFieldsByGovernorate(govId: string): Observable<IFieldModel[]>;
    getFieldsByCity(cityId: string): Observable<IFieldModel[]>;
}
