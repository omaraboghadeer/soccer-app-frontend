import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

interface DescCardDto {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    publishedAt: Date;
    url: string;
}

@Component({
    selector: 'pci-desc-card',
    imports: [DatePipe],
    template: `
        <div class="card card-body gap-3 h-100">
            <img [src]="info().imageUrl" class="card-img-top object-fit-cover" alt="Default Image" height="250">

            <div class="d-flex justify-content-between">
                <span class="badge badge-info">
                    {{ info().category }}
                </span>
                <span class="text-muted">
                    {{ info().publishedAt | date:'mediumDate' }}
                </span>
            </div>

            <h2 class="card-title m-0">{{ info().title }}</h2>

            <p class="card-text">
                {{ info().description }}
            </p>

            <div class="text-end mt-auto">
                <a 
                    [href]="info().url" 
                    target="_blank" 
                    class="btn btn-primary">
                    Read More
                </a>
            </div>
        </div>
    `,
})
export class DescCard {

    info = input.required<DescCardDto>();

}
