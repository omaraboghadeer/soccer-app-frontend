import {
    AfterViewInit,
    Component,
    contentChildren,
    CUSTOM_ELEMENTS_SCHEMA,
    effect,
    ElementRef,
    inject,
    input,
    PLATFORM_ID,
    TemplateRef,
    viewChild
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { SwiperOptions } from 'swiper/types';
import { register } from 'swiper/element/bundle';


// Register Swiper custom elements
register();

@Component({
    selector: 'pci-carousel',
    
    template: `
        <swiper-container #swiper [attr.init]="false">
            @for (slide of slides(); track $index) {
                <swiper-slide>
                    <ng-container 
                        [ngTemplateOutlet]="slide.templateRef()!">
                    </ng-container>
                </swiper-slide>
            }
        </swiper-container>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="swiper-navigation d-flex gap-1">
                <button #prevEl class="btn btn-lg btn-primary rounded-circle icon-btn">
                    <span class="d-inline-flex fs-4 lh-1"><i class="icon-arrow-left"></i></span>
                </button>
                <button #nextEl class="btn btn-lg btn-primary rounded-circle icon-btn">
                    <span class="d-inline-flex fs-4 lh-1"><i class="icon-arrow-right"></i></span>
                </button>
            </div>
            <div #paginationEl class="swiper-pagination"></div>
        </div>
    `,
    imports: [NgTemplateOutlet], // Add the schema
    schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    styles: `
        swiper-slide {
            height: auto;
        }

        .swiper-pagination {
            position: static !important;
            display: flex !important;
            justify-content: center;
            gap: 0.5rem;
        }

        .swiper-pagination-bullet {
            width: 1rem !important;
            height: 1rem !important;
            background: var(--moe-gray-200) !important;
            opacity: 1 !important;
            border-radius: 50%;
            transition: background 0.6s;
        }

        .swiper-pagination-bullet-active {
            background: var(--moe-primary) !important;
        }
    `,
})
export class Carousel implements AfterViewInit {
    private readonly _platformId = inject(PLATFORM_ID);
    private readonly _swiperElm = viewChild<ElementRef<any>>('swiper');
    private readonly _prevEl = viewChild<ElementRef>('prevEl');
    private readonly _nextEl = viewChild<ElementRef>('nextEl');
    private readonly _paginationEl = viewChild<ElementRef>('paginationEl');

    public slides = contentChildren(SwiperSlideComponent);


    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this._platformId)) return;

        if (customElements.get('swiper-container')) {
            this.initSwiper();
        } 
        // else {
        //     import('swiper/element/bundle').then(({ register }) => {
        //         register();
        //         this.initSwiper();
        //     });
        // }
    }

    private initSwiper(): void {
        const swiperParams: SwiperOptions = {
            slidesPerView: 3,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 3,
                },
            },
            autoplay: {
                delay: 2500,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: this._nextEl()?.nativeElement,
                prevEl: this._prevEl()?.nativeElement,
            },
            pagination: {
                enabled: true,
                clickable: true,
                el: this._paginationEl()?.nativeElement,
            },
            keyboard: { enabled: true },
            spaceBetween: 24,
            freeMode: true,
            observer: true,
            observeParents: true,
            loop: true,
        };
        
        const swiperNative = this._swiperElm()?.nativeElement;
        if (!swiperNative) return;

        // Destroy previous instance (if exists)
        // It is important to solve style issue
        if (swiperNative.swiper) {
            swiperNative.swiper.destroy(true, true);
        }

        Object.assign(swiperNative, swiperParams);
        swiperNative.initialize();

    }

}



@Component({
    selector: 'pci-slide',
    standalone: true,
    template: '<ng-template #swiperSlide><ng-content></ng-content></ng-template>',
})
export class SwiperSlideComponent {
    public templateRef = viewChild<TemplateRef<any>>('swiperSlide');
}
