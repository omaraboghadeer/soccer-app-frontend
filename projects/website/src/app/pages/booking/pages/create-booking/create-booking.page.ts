import { Component } from '@angular/core';
import { DateAndTimeComponent } from "../../components/date-and-time/date-and-time.component";

@Component({
    selector: 'app-create-booking',
    imports: [DateAndTimeComponent],
    templateUrl: './create-booking.page.html',
    styleUrl: './create-booking.page.scss',
})
export class CreateBookingPage {

}
