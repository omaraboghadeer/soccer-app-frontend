import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-payment',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p>
        payment works!
        </p>
    `,
    styles: ``,
})
export class PaymentComponent {

}
