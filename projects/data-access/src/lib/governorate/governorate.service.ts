import { Injectable } from '@angular/core';
import { Governorate } from '@domain';
import { GovernorateRepository } from '@domain';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../public-api';
import * as Govs from '../data/static/eg_governorates.json';

@Injectable({
  providedIn: 'root',
})
export class GovernorateService extends ApiService implements GovernorateRepository {

    getGovernorates(): Observable<Governorate[]> {
        return of(Govs.data as Governorate[]);
    }
  
}
