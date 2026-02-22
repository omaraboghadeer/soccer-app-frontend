import { Injectable } from '@angular/core';
import { FieldModel } from '@domain/field/field.model';
import { FieldRepository } from '@domain/field/field.repository';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../public-api';
import * as FIELDS from '../data/static/fields.json';

@Injectable({
    providedIn: 'root',
})
export class FieldService extends ApiService implements FieldRepository {

    getFieldsByCity(cityId: string): Observable<FieldModel[]> {
        return of(FIELDS.data.filter(field => field.address.city.id === cityId));
    }

}
