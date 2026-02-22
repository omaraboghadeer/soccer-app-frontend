import { Component } from '@angular/core';
import { CTASection } from "./components/cta-section/cta-section";
import { HeroSection } from "./components/hero-section/hero-section";
import { HowItWorkSection } from "./components/how-it-work-section/how-it-work-section";
import { LatestUpdatesSection } from "./components/latest-updates-section/latest-updates-section";
import { OurFeaturesSection } from "./components/our-features-section/our-features-section";
import { ShowCaseSection } from "./components/show-case-section/show-case-section";

@Component({
    selector: 'app-landing',
    imports: [
        HeroSection,
        OurFeaturesSection,
        ShowCaseSection,
        HowItWorkSection,
        LatestUpdatesSection,
        CTASection,
    ],
    template: `
        <app-hero-section/>
        <app-our-features-section/>
        <app-show-case-section/>
        <app-how-it-work-section/>
        <app-latest-updates-section/>
        <app-cta-section/>
    `,
})
export class Landing {

}
