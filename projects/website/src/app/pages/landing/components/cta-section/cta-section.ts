import { Component } from '@angular/core';

@Component({
    selector: 'app-cta-section',
    template: `
        <section class="">
            <div class="container py-5 text-center">
                <h2 class="fw-bold mb-4">Ready to Start Playing?</h2>
                <!-- Join thousands of players already using Str8Kick to organize their games -->
                <p class="mb-4 fs-5">Join thousands of players booking their football fields with us. It's fast, easy, and secure.</p>
                <a href="#" class="btn btn-primary btn-lg">
                    Get Start Now
                    <i class="icon-soccer-ball ms-2"></i>
                </a>

                <div class="line"></div>
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6">
                        <h4 class="fw-bold">Download Our Mobile APP!</h4>
                        <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                            @for (applink of appDownloadLinks; track $index) {
                                <a 
                                    class="card card-body bg-gray-950 text-gray-25 shadow-lg" 
                                    [href]="applink.url" target="_blank">
                                    <div class="d-flex align-items-center justify-content-center gap-2 content">
                                        <i class="{{ applink.icon }} fs-1"></i>
                                        <p class="m-0 text-start">
                                            <small>Download on the</small> <br>
                                            <strong>{{ applink.title }}</strong>
                                        </p>
                                    </div>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    styleUrl: './cta-section.scss',
})
export class CTASection {

    appDownloadLinks = [
        { title: 'App Store', icon: 'icon-appleinc', url: '#' },
        { title: 'Google Play', icon: 'icon-android', url: '#' }
    ];

}
