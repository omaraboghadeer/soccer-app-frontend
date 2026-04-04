import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-booking',
    imports: [RouterOutlet],
    template: `
        <section class="bg-primary d-flex align-items-end" style="min-height: 25vh;">
            <div class="container pb-4 text-gray-200">
                <h1 class="mb-0">Reservation</h1>
                <h6 class="mb-0">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, optio.</h6>
            </div>
        </section>

        <div class="container py-5">
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-9">
                    <router-outlet/>
                </div>
            </div>
        </div>
    `,
})
export class BookingLayout {

}
