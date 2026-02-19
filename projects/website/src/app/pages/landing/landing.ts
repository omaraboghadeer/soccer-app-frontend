import { Component } from '@angular/core';
import { HeroSection } from "./components/hero-section/hero-section";
import { OurFeaturesSection } from "./components/our-features-section/our-features-section";
import { ShowCaseSection } from "./components/show-case-section/show-case-section";
import { HowItWorkSection } from "./components/how-it-work-section/how-it-work-section";
import { LatestUpdatesSection } from "./components/latest-updates-section/latest-updates-section";
import { CTASection } from "./components/cta-section/cta-section";
import { ReservationSection } from "./components/reservation-section/reservation-section";

@Component({
    selector: 'app-landing',
    imports: [
    HeroSection,
    OurFeaturesSection,
    ShowCaseSection,
    HowItWorkSection,
    LatestUpdatesSection,
    CTASection,
    ReservationSection
],
    template: `
        <app-hero-section/>
        <app-reservation-section/>
        <app-our-features-section/>
        <app-show-case-section/>
        <app-how-it-work-section/>
        <app-latest-updates-section/>
        <app-cta-section/>
    `,
})
export class Landing {

}
