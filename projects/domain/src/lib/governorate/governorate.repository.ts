import { Observable } from "rxjs";
import { Governorate } from "./governorate.model";

export interface GovernorateRepository {
    getGovernorates(): Observable<Governorate[]>
}
