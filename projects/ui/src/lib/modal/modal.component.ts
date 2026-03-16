import { Component, input } from '@angular/core';

@Component({
    selector: 'lib-modal',
    imports: [],
    templateUrl: './modal.component.html',
    styles: ``,
})
export class ModalComponent {

    id = input.required<string>();
    title = input.required<string>();
    

}
