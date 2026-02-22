import { Observable } from "rxjs";
import { FieldModel } from "./field.model";

export interface FieldRepository {
    getFieldsByCity(cityId: string): Observable<FieldModel[]>
}
