import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityService, FieldService, GovernorateService } from '@data-access';
import { CityModel, IFieldModel, Governorate } from '@domain';
import { RadioCardComponent } from '@ui';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ReservationFromState } from '../../state/reservation-from.state';

@Component({
    selector: 'app-fields',
    imports: [NgSelectComponent, RadioCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fields.component.html',
})
export class FieldsComponent implements OnInit {
    private readonly _governoratesService = inject(GovernorateService);
    private readonly _citiesService = inject(CityService);
    private readonly _fieldService = inject(FieldService);
    public readonly _reservationState = inject(ReservationFromState);

    governorates = toSignal(this._governoratesService.getGovernorates(), { initialValue: [] });
    cities = signal<CityModel[]>([]);
    fieldsType = signal<string[]>(['5 VS 5', '7 VS 7', '11 VS 11']);
    fields = signal<IFieldModel[]>([]);
    
    page = signal(1);
    pageSize = signal(6);
    paginatedFields = computed(() => {
        const start = (this.page() - 1) * this.pageSize();
        const end = start + this.pageSize();
        return this.fields().slice(start, end);
    });

    onSelectGovernorate(val: Governorate) {
        this._fieldService.getFieldsByGovernorate(val.id)
        .subscribe(f => {
            this.fields.set(f);
        });
        
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

    ngOnInit(): void {
        this._fieldService.getAllFields()
        .subscribe(f => {
            this.fields.set(f);
        });
    }
}
