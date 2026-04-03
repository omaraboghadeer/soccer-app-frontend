import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FieldService, CityService, GovernorateService } from '@data-access';
import { NgSelectComponent } from '@ng-select/ng-select';
import { IFieldModel, CityModel, Governorate } from '@domain';

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
    fields = signal<IFieldModel[]>([]);
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
