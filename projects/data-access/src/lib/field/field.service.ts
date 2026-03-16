import { Injectable } from '@angular/core';
import { IFieldModel } from '@domain/field/field.model';
import { FieldRepository } from '@domain/field/field.repository';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../public-api';
import * as FIELDS from '../data/static/fields.json';

@Injectable({
    providedIn: 'root',
})
export class FieldService extends ApiService implements FieldRepository {

    getAllFields(): Observable<IFieldModel[]> {
        return of(FIELDS.data.map(mappingFieldDto));
    }

    getFieldsByGovernorate(govId: string): Observable<IFieldModel[]> {
        return of(FIELDS.data.filter(field => field.address.governorate.id === govId).map(mappingFieldDto));
    }

    getFieldsByCity(cityId: string): Observable<IFieldModel[]> {
        return of(FIELDS.data.filter(field => field.address.city.id === cityId).map(mappingFieldDto));
    }

}

function mappingFieldDto(field: any): IFieldModel {
    return {
        id: field.id,
        name: field.name,
        phone: field.phone,
        price: field.price,
        supportedSizes: field.supportedSizes,
        images: [],
        workingTime: field.workingTime,
        address: field.address,
        owner: field.owner
    }
}