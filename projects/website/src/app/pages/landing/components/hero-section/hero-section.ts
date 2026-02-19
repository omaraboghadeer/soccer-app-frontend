import { Component } from '@angular/core';

@Component({
    selector: 'app-hero-section',
    imports: [],
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
                </div>

                <div class="card-glass">
                    <div class="card card-body">
                        <h3 class="card-title text-start text-capitalize">find your slot fast</h3>

                        <form action="">
                            <div class="d-flex gap-2">
                                <div class="input-group align-items-center rounded-5 px-2 py-2 bg-gray-200">
                                    <span class="badge bg-primary-600 rounded-circle me-2" id="field-location">
                                        <i class="icon-map-pin text-white"></i>
                                    </span>
                                    <input type="text" placeholder="Field Location" aria-label="Field Location" aria-describedby="field-location">
                                </div>

                                <div class="input-group align-items-center rounded-5 px-2 py-2 bg-gray-200">
                                    <span class="badge bg-primary-600 rounded-circle me-2" id="day">
                                        <i class="icon-calendar text-white"></i>
                                    </span>
                                    <input type="text" placeholder="20-02-2026" aria-label="Day" aria-describedby="day">
                                </div>

                                <div class="input-group align-items-center rounded-5 px-2 py-2 bg-gray-200">
                                    <span class="badge bg-primary-600 rounded-circle me-2" id="time">
                                        <i class="icon-clock text-white"></i>
                                    </span>
                                    <input type="text" placeholder="00:00" aria-label="Timing" aria-describedby="time">
                                </div>

                                <div class="input-group align-items-center rounded-5 px-2 py-2 bg-gray-200">
                                    <span class="badge bg-primary-600 rounded-circle me-2" id="duration">
                                        <i class="icon-stop-watch text-white"></i>
                                    </span>
                                    <input type="text" placeholder="1 Hour" aria-label="Book duration" aria-describedby="duration">
                                </div>

                                <button type="submit" class="btn btn-primary pe-1 rounded-5">
                                    Check Availability

                                    <span class="badge ms-2 bg-white rounded-circle">
                                        <i class="icon-arrow-up-right text-black" style="font-size: 0.5rem;"></i>
                                    </span>
                                </button>
                            </div>
                        </form>
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
