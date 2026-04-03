import { Component } from '@angular/core';
import { QuickReservationForm } from "../quick-reservation-form/quick-reservation-form";

@Component({
    selector: 'app-hero-section',
    imports: [QuickReservationForm],
    template: `
        <section class="hero-section">
            <div class="overlay"></div>

            @if (false) {
                <div class="container z-2 text-center">
                    <h1 class="fw-bold">Welcome to Our <span class="logo">Str8Kick</span>!</h1>
                    <h5>The Ultimate Street Football Platform.</h5>
                    <h5>
                        Book fields, join competitions, build your team, and connect with the street football community. All in one place.
                    </h5>
    
                    <div class="d-flex flex-column flex-md-row justify-content-center gap-3 mt-5">
                        <a routerLink="/register" class="btn btn-primary btn-lg">
                            Get Started
                            <i class="ms-3 fs-3 icon-player"></i>
                        </a>
                        <a routerLink="/about" class="btn btn-light btn-lg">
                            Learn More
                            <i class="ms-3 icon-arrow-down"></i>
                        </a>
                    </div>
    
                    <div class="row justify-content-center mt-5">
                        @for (numbers of ourNumbers; track $index) {
                            <div class="col-md-4 col-12 text-center">
                                <h2 class="display-4 fw-bold">{{numbers.value}}</h2>
                                <p class="fs-5">{{numbers.label}}</p>
                            </div>
                        }
                    </div>
                </div>
            }

            <div class="container z-2">
                <div class="row">
                    <div class="col-lg-8">
                        <h5>
                            <i class="icon-soccer-ball"></i>
                            Trusted in Cairo
                        </h5>
                        <h1 class="text-capitalize">
                            book your mini <br> soccer field
                        </h1>
                        <p class="w-50 lh-base">
                            Book fields, join competitions, build your team, and connect with the street football community. All in one place.
                        </p>
                    </div>

                    <div class="col-lg-3 offset-lg-1">
                        <div class="card-glass">
                            <div class="card card-body bg-white">
                                <h4 class="d-flex text-capitalize mb-3">
                                    <span class="badge bg-primary-600 rounded-circle me-2" >
                                        <i class="icon-pitch-outline text-white"></i>
                                    </span>

                                    15 Fields
                                </h4>

                                <p class="card-text fs-5 text-capitalize">
                                    book instantly only verified high-rated fields
                                </p>

                                <button type="button" class="btn btn-gray pe-1 py-1 rounded-5 mt-4" style="width: fit-content;">
                                    Explore All Fields
                                    <span class="badge ms-2 bg-primary rounded-circle">
                                        <i class="icon-arrow-up-right text-white"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-glass mt-5">
                    <div class="card card-body bg-white">
                        <h3 class="card-title text-start text-capitalize mb-3">find your slot fast</h3>

                        <app-quick-reservation-form/>
                    </div>
                </div>
            </div>
        </section>
    `,
    styleUrls: ['./hero-section.scss'],
})
export class HeroSection {

    ourNumbers = [
        { label: 'Active Users', value: '1M+' },
        { label: 'Football Fields', value: '10K+' },
        { label: 'Teams', value: '100+' },
    ]

}
