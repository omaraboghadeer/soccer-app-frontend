import { Injectable } from '@angular/core';
import { ApiService } from '../../public-api';
import { CityRepository } from '@domain/city/city.repository';
import { CityModel } from '@domain/city/city.model';
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
