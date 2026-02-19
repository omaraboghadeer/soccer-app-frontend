import { Component } from '@angular/core';

@Component({
    selector: 'app-show-case-section',
    imports: [],
    template: `
        <section class="bg-gray-100">
            <div class="container py-5">
                <div class="row g-4">
                    <div class="col-lg-7 col-12">
                        <h2 class="fw-bold">Play Anywhere, Anytime</h2>
                        <p class="mb-5">
                            Find and book the perfect football field for your next game. From urban cages to full-size pitches, we've got you covered.
                        </p>
                        <ul class="list-unstyled d-flex flex-column gap-4">
                            <li class="d-flex gap-2 align-items-start">
                                <i class="icon-check-circle text-primary-400"></i>
                                <div>
                                    <h5 class="mb-0 fw-bold lh-1">Instant Booking</h5>
                                    <p class="mb-0 fs-6">Reserve your slot in seconds with real-time availability</p>
                                </div>
                            </li>
                            <li class="d-flex gap-2 align-items-start">
                                <i class="icon-check-circle text-primary-400"></i>
                                <div>
                                    <h5 class="mb-0 fw-bold lh-1">Verified Fields</h5>
                                    <p class="mb-0 fs-6">All locations are verified and rated by the community</p>
                                </div>
                            </li>
                            <li class="d-flex gap-2 align-items-start">
                                <i class="icon-check-circle text-primary-400"></i>
                                <div>
                                    <h5 class="mb-0 fw-bold lh-1">Flexible Pricing</h5>
                                    <p class="mb-0 fs-6">Choose from various pricing options that fit your budget</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-5 col-12">
                        <img 
                            src="https://images.unsplash.com/photo-1718545616096-420a0caf90d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb290YmFsbCUyMHNvY2NlciUyMGZpZWxkJTIwdXJiYW58ZW58MXx8fHwxNzcwNTU4MTc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                            alt="Football field image"
                            class="rounded-2 shadow-lg w-100 object-fit-cover object-position-top" height="350">
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: ``,
})
export class ShowCaseSection {

}
