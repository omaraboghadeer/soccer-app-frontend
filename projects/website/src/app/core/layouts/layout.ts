import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./footer/footer";
import { Header } from "./header/header";

@Component({
    selector: 'app-layout',
    imports: [Header, RouterOutlet, Footer],
    template: `
        <header class="position-absolute w-100 top-0 bg-transparent z-3">
            <app-header/>
        </header>

        <main>
            <router-outlet/>
        </main>
        
        <footer class="bg-primary-100">
            <app-footer/>
        </footer>
    `,
})
export class Layout {

}
