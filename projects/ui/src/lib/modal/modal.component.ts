import { ChangeDetectionStrategy, Component, inject, Input, input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';

@Component({
    selector: 'lib-modal',
    imports: [],
    templateUrl: './modal.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

    @Input() id!: string;
    @Input() title!: string;

    public activeModal = inject(NgbActiveModal);
    

}
