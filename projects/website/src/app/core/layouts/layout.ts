import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-layout',
    imports: [Header, RouterOutlet, Footer, NgClass],
    template: `
        <header class="w-100 top-0 z-3"
            [ngClass]="isHome() ? 'position-absolute bg-transparent' : 'position-sticky bg-white border-bottom border-gray-200' "
        >
            <app-header [isHomePage]="isHome()" />
        </header>

        <main>
            <router-outlet/>
        </main>
        
        <footer>
            <div class="grid-container bg-white rounded-3 py-5">
                <app-footer/>
            </div>
        </footer>
    `,
})
export class Layout {
    private readonly _router = inject(Router);

    private currentUrl = toSignal(
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this._router.url)
        ),
        { initialValue: this._router.url }
    );

    isHome = computed(() => {
        return this.currentUrl() === '/home';
    });

}
