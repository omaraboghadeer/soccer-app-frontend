import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { ReservationApiService } from '@data-access';
import { Reservation } from '@domain';
import { FieldCardComponent, ToastService } from '@ui';


@Component({
    selector: 'app-my-reservation',
    imports: [FormField, FieldCardComponent, RouterLink],
    templateUrl: './my-reservation.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyReservationPage {

    private readonly _toastService = inject(ToastService);
    private readonly _reservationService = inject(ReservationApiService);

    myReservations = signal<Reservation | undefined>(undefined);
    private myBookingSearchModel = signal({ref: ''});
    myBookingSearchForm = form<{ref: string}>(
        this.myBookingSearchModel, 
        (fieldPath) => {
            required(fieldPath.ref, {message: "Booking Reference is required"});
        }
    );

    onSubmit(event: Event) {
        event.preventDefault();

        submit(this.myBookingSearchForm, async () => {
            const value = this.myBookingSearchForm().value();
            
            this._reservationService.getReservationsByRef(value.ref)
            .subscribe({
                next: res => this.myReservations.set(res.data),
                error: (err: HttpErrorResponse) => this._toastService.show({
                    type: "error",
                    message: err.message
                })
            });
        });
    }

}
