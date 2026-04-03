import { Observable } from "rxjs";
import { CityModel } from "./city.model";

export interface CityRepository {
    getCities(governorateId: string): Observable<CityModel[]>
}
