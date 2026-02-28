import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ToastTypes } from './toast.service';

@Component({
    selector: 'lib-toast',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="alert d-flex align-items-center position-fixed z-3 m-0" role="alert"
            [class.alert-danger]="type() == 'error'"
            [class.alert-success]="type() == 'success'"
            [class.alert-info]="type() == 'info'"
        >
            <div class="toast-body">
                {{ message() }}
            </div>
            <button 
                type="button" 
                class="btn" 
                (click)="handleClose()"
                data-bs-dismiss="alert" aria-label="Close">
                <i class="icon-close"></i>
            </button>
        </div>
    `,
    styles: `
        .alert {
            inset-inline-end: 1rem;
            inset-block-start: 3rem;
        }
    `,
})
export class ToastComponent {

    message = input.required<string>();
    type = input.required<ToastTypes>();
    onClose = input<() => void>(); // 🔥 close callback

    handleClose() {
        this.onClose()?.();
    }

}
