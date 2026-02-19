import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-how-it-work-section',
    imports: [NgTemplateOutlet],
    template: `
        <section>
            <div class="container py-5">
                <h2>How it works</h2>
                <p>Get started in three simple steps</p>
                <div class="row g-4 mt-5">
                    @for (item of howItWorkSteps; track $index) {
                        <div class="col-lg-4 col-md-6 col-12">
                            <ng-container 
                                [ngTemplateOutlet]="howItWorkItem" 
                                [ngTemplateOutletContext]="{ $implicit: item }" >
                            </ng-container>
                        </div>
                    }
                </div>
            </div>
        </section>

        <ng-template #howItWorkItem let-item>
            <div class="how-it-work-item">
                <span class="text-center">{{ item.step }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
            </div>
        </ng-template>
    `,
    styles: `
        .how-it-work-item {
            & > span {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 50%;
                background-color: #25935f;
                color: #fff;
                font-weight: bold;
                margin-bottom: 1.5rem;
            }
        }
    `
})
export class HowItWorkSection {

    howItWorkSteps: { step: number; title: string; description: string }[] = [
        { 
            step: 1, 
            title: 'Sign Up', 
            description: 'Create your account as a player or pitch owner. It only takes a minute.' 
        },
        { 
            step: 2, 
            title: 'Find & Book', 
            description: 'Browse available fields, join competitions, or create your team.' 
        },
        { 
            step: 3, 
            title: 'Play & Connect', 
            description: 'Show up and play. Share your moments and grow your football network.' 
        },
    ];

}
