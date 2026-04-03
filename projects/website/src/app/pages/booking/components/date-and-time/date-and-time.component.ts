import { Component } from '@angular/core';

@Component({
    selector: 'app-date-and-time',
    imports: [],
    template: `
        <!-- Select Field -->
        <div class="card card-body bg-primary-50 border-primary">
            <div class="d-flex align-items-start gap-3">
                <img src="images/default-images.png" class="rounded" alt="default image" height="100">
                <div>
                    <h5 class="card-title">Field Name</h5>
                    
                    <a href="tel:+201110000000" title="Field Mobile number">
                        <p class="mb-0">
                            <i class="icon-pitch"></i>
                            +201110000000 
                        </p>
                    </a>
                    <a href="javascript::void(0)" role="button" (click)="openMap()" title="Open in Google Mapp">
                        <p class="mb-0">
                            <i class="icon-map-pin"></i>
                            Governorate, City
                        </p>
                    </a>
                </div>

                <div class="ms-auto">
                    <span class="fs-3 fw-bold">150 EGP/hr</span>
                </div>
            </div>
        </div>


    `,
})
export class DateAndTimeComponent {
    openMap() {
        const coordinates = {
            lat: 24.7136,
            lng: 46.6753
        };

        const googleMapURL =  `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
        window.open(googleMapURL, "_blank",  "noopener,noreferrer");
    }
}
