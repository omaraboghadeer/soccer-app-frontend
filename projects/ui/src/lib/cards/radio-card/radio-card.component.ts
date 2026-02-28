import { Component, input, output } from '@angular/core';
import { FieldModel } from '@domain/field/field.model';

@Component({
    selector: 'lib-radio-card',
    imports: [],
    templateUrl: './radio-card.component.html',
    styleUrl: './radio-card.component.scss',
})
export class RadioCardComponent {
    ctrlName = input.required<string>();
    id = input.required<any>();
    data = input.required<any>();
    selectionChange = output<FieldModel>();
}
