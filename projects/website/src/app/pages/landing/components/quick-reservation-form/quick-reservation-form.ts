import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityService } from '@data-access/city/city.service';
import { GovernorateService } from '@data-access/governorate/governorate.service';
import { FieldService } from '@data-access/field/field.service';
import { CityModel } from '@domain/city/city.model';
import { Governorate } from '@domain/governorate/governorate.model';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FieldModel } from '@domain/field/field.model';

@Component({
    selector: 'app-quick-reservation-form',
    imports: [NgSelectComponent,],
    templateUrl: './quick-reservation-form.html',
    styleUrl: './quick-reservation-form.scss',
})
export class QuickReservationForm implements OnInit {

    private readonly _governoratesService = inject(GovernorateService);
    private readonly _citiesService = inject(CityService);
    private readonly _fieldService = inject(FieldService);

    governorates = toSignal(this._governoratesService.getGovernorates(), { initialValue: [] });
    cities = signal<CityModel[]>([]);
    fields = signal<FieldModel[]>([]);
    fieldsType = signal<string[]>(['5 VS 5', '7 VS 7', '11 VS 11']);

    onSelectGovernorate(val: Governorate) {
        this._citiesService.getCities(val.id)
        .subscribe(c => {
            this.cities.set(c);
        });
    }

    onSelectCity(val: CityModel) {
        this._fieldService.getFieldsByCity(val.id)
        .subscribe(f => {
            this.fields.set(f);
        });
    }

    ngOnInit(): void { }

}
