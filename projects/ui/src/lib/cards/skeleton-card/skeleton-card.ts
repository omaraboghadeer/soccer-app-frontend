import { Component } from '@angular/core';

@Component({
    selector: 'pci-skeleton-card',
    imports: [],
    template: `
        <div class="card card-body" aria-hidden="true">
            <svg aria-label="Placeholder" class="bd-placeholder-img card-img-top" height="180" preserveAspectRatio="xMidYMid slice" role="img" width="100%" xmlns="http://www.w3.org/2000/svg">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#e5e7eb"></rect>
            </svg>
            <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
            </h5>
            <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
            </p>
            <a class="btn btn-primary disabled placeholder col-6 mt-3" aria-disabled="true"></a>
        </div>
    `,
})
export class SkeletonCard { }
