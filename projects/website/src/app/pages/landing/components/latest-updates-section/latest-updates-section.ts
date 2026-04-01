import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, signal } from '@angular/core';
import { ArticleApi } from '@data-access';
import { ArticleModel } from '@domain';
import { DescCardDto } from '@domain';
import { DescCard } from '@ui';
import { SkeletonCard } from '@ui';
import { Carousel, SwiperSlideComponent } from '@ui';
import { map } from 'rxjs';


@Component({
  selector: 'app-latest-updates-section',
  imports: [Carousel, SkeletonCard, DescCard, SwiperSlideComponent],
  templateUrl: './latest-updates-section.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LatestUpdatesSection {

    private readonly articleApi = inject(ArticleApi);
    updates = signal<DescCardDto[]>([]);
    loading = signal(true);

    constructor() {
        effect(() => {
            // this.loadLatestUpdates();
        });
    }

    private loadLatestUpdates() {
        this.articleApi.getLatestUpdates()
        .pipe(map(updates => updates.map(mapDescCard)))
        .subscribe({
            next: (response) => {
                this.updates.set(response);
                this.loading.set(false);
            },
            error: (error) => {
                console.error('Error fetching latest updates:', error);
                this.loading.set(false);
            }
        });
    }
}

function mapDescCard(data: ArticleModel): DescCardDto {
    return {
        title: data.title,
        description: data.body,
        imageUrl: data.imageUrl,
        category: data.category,
        publishedAt: new Date(data.publishedAt),
        url: `/articles/${data.id}`,
    };
}