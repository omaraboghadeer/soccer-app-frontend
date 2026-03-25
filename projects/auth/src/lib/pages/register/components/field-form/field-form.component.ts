import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, NgModuleRef, signal, TemplateRef, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { IFieldFormData, RegistrationService } from '@auth/state/registration.service';
import { CityService } from '@data-access/city/city.service';
import { GovernorateService } from '@data-access/governorate/governorate.service';
import { CityModel } from '@domain/city/city.model';
import { Governorate } from '@domain/governorate/governorate.model';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal';
import { NgSelectComponent } from '@ng-select/ng-select';
import { MapComponent } from '@ui/map/map.component';

@Component({
    selector: 'lib-field-form',
    imports: [
        FormField, 
        NgTemplateOutlet, 
        NgClass, 
        NgSelectComponent,
        MapComponent
    ],
    templateUrl: './field-form.component.html',
    styles: `
        fieldset {
            border: 1px solid;
            padding: 1rem;
        }
        legend {
            background-color: black;
            color: white;
            padding: 3px 6px;
            float: unset;
            width: auto;
            margin: 0;
        }

        .slide-down {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out;

            &.open {
                max-height: 200px;
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormComponent {

    protected readonly _governoratesService = inject(GovernorateService);
    protected readonly _citiesService = inject(CityService);
    protected readonly _registrationService = inject(RegistrationService);
    protected readonly _modalService = inject(NgbModal);

    governorates = toSignal(this._governoratesService.getGovernorates(), { initialValue: [] });
    cities = signal<CityModel[]>([]);
    onSelectGovernorate(val: Governorate) {
        this._citiesService.getCities(val.id)
        .subscribe(c => {
            this.cities.set(c);
        });
    }

    coordinatesValue = signal<google.maps.LatLngLiteral>({lat: 0, lng: 0});
    closeResult: WritableSignal<string> = signal('');
    private mapModalRef!: NgbModalRef;
    openMap(ctx: TemplateRef<any>) {
        
        this.mapModalRef = this._modalService.open(ctx, {
            size: 'lg',
            centered: true,
            keyboard: false,
            backdrop: 'static',
            ariaLabelledBy: 'modal-basic-title'
        });

        // modalRef.componentInstance.id = 'mapModal';
        // modalRef.componentInstance.title = 'Map';

        this.mapModalRef.result.then(
            res => this.closeResult.set(`Closed with: ${res}`),
            reason =>  this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`)
        )
    }

    closeMapModal() {
        if (typeof this.coordinatesValue() == 'string')
            return

        this.fieldForm.address.coordinates().value.set(this.coordinatesValue());
        this.mapModalRef.close('Close click')
    }

    onLocationChanges(ev: google.maps.LatLngLiteral) {
        console.log("🚀 ~ FieldFormComponent ~ onLocationChanges ~ ev:", ev)
        this.coordinatesValue.set(ev);
    }

    private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

    fieldSizes = signal([
        {
            label: '5 VS 5',
            value: '5vs5',
            selected: true
        }, 
        {
            label: '7 VS 7',
            value: '7vs7',
            selected: false
        },
        {
            label: '11 VS 11',
            value: '11vs11',
            selected: false
        }
    ]);

    showInputsForSize_5: boolean = true;
    showInputsForSize_7: boolean = false;
    showInputsForSize_11: boolean = false;
    onSelectSize(input: HTMLInputElement) {
        const isCheck = input.checked;
        const value = input.value as '5vs5' | '7vs7' | '11vs11';
        console.log("🚀 ~~ value:", value);

        if (!isCheck) {
            switch (value) {
                case '5vs5':
                    this.showInputsForSize_5 = false;       
                    break;
                case '7vs7':
                    this.showInputsForSize_7 = false;       
                    break;
                case '11vs11':
                    this.showInputsForSize_11 = false;       
                    break;
            }
            return
        }

        switch (value) {
            case '5vs5':
                this.showInputsForSize_5 = true;       
                break;
            case '7vs7':
                this.showInputsForSize_7 = true;       
                break;
            case '11vs11':
                this.showInputsForSize_11 = true;       
                break;
        }
    }


    //#region Form
    private fieldFormModel = signal<IFieldFormData>({
        name: '',
        phone: '',
        images: [''],
        price: 100,
        workingTime: {
            start: '15:00',
            end: '00:00'
        },
        supportedSizes: [''],
        address: {
            governorate: {
                id: '',
                name_ar: '',
                name_en: ''
            },
            city: {
                governorate_id: '',
                id: '',
                name_ar: '',
                name_en: ''
            },
            coordinates: {
                lat: 0,
                lng: 0
            }
        }
    });

    fieldForm = form(this.fieldFormModel, (f) => {
        required(f.name, { message: 'Field name is required' });
        required(f.phone, { message: 'Field mobile number is required' });
        required(f.price, { message: 'Price is required' });
        required(f.workingTime.start, { message: 'Working time is required' });
        required(f.workingTime.end, { message: 'Working time is required' });
        required(f.address, { message: 'Field name is required' });
    });


    async onSubmit(event?: Event) {
        event?.preventDefault();
        this.fieldForm().markAsTouched();
        console.log("🚀 ~ onSubmit ~:", this.fieldForm().value())

        // Reset the value
        this._registrationService.reset();

        await submit(this.fieldForm, async () => {
            const value = this.fieldForm().value();
            this._registrationService.fieldOwnerFormState.set(value);
        });
    }
    //#endregion Form

}
