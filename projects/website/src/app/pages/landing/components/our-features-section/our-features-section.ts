import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-our-features-section',
    imports: [NgClass],
    template: `
        <section class="bg-white">
            <div class="container py-5">
                <h2>Everything You Need</h2>
                <p>All the tools to elevate your street football experience</p>

                <div class="row g-4 mt-4">
                    
                    @for (tool of features; track $index) {
                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="card card-body gap-3">
                                <div class="icon-container ">
                                    <i [ngClass]="tool.icon"></i>
                                </div>
                                <h5 class="card-title mb-0">{{ tool.title }}</h5>
                                <p class="mb-0">{{ tool.description }}</p>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </section>
    `,
    styleUrls: ['./our-features-section.scss'],
})
export class OurFeaturesSection {

    features: { title: string; description: string; icon: string }[] = [
        {
            title: 'Field Reservations',
            description: 'Book the best street football fields in your area. Real-time availability and instant confirmation.',
            icon: 'icon-pitch',
        },
        {
            title: 'Team Management',
            description: 'Create and manage your football teams effortlessly. Invite players, schedule matches, and track performance.',
            icon: 'icon-team',
        },
        {
            title: 'Competitions',
            description: 'Join local street football competitions and tournaments. Compete with other teams and climb the leaderboard.',
            icon: 'icon-competitions',
        },
        {
            title: 'Social Feed',
            description: 'Share your moments, connect with other players, and stay updated with the latest news in the street football community.',
            icon: 'icon-feed',
        }
    ];
}
