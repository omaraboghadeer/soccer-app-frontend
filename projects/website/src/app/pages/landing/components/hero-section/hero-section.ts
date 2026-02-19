import { Component } from '@angular/core';

@Component({
    selector: 'app-hero-section',
    imports: [],
    template: `
        <section class="hero-section">
            <div class="container text-center">
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
