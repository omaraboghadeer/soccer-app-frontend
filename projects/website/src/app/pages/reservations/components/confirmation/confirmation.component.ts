import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReservationFromState } from '../../state/reservation-from.state';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-confirmation',
    imports: [DatePipe],
    templateUrl: './confirmation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent {
    public readonly _reservationState = inject(ReservationFromState);

    openMap() {
        const coordinates = {
            lat: 24.7136,
            lng: 46.6753
        };

        const googleMapURL =  `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
        window.open(googleMapURL, "_blank",  "noopener,noreferrer");
    }
}
