import { Injectable } from '@angular/core';
import { ApiService } from '../../public-api';
import { CityRepository } from '@domain';
import { CityModel } from '@domain';
import { Observable, of } from 'rxjs';
import * as CITIES from '../data/static/eg_cities.json';

@Injectable({
  providedIn: 'root',
})
export class CityService extends ApiService implements CityRepository {
  
    getCities(governorateId: string): Observable<CityModel[]> {
        return of(CITIES.data.filter(city => city.governorate_id === governorateId));
    }

}
