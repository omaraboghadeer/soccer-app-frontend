import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'lib-auth',
    imports: [RouterOutlet, RouterLink],
    encapsulation: ViewEncapsulation.None,
    template: `
        <header class="position-sticky bg-white border-bottom w-100 top-0 z-3">
            <nav class="navbar navbar-expand-md">
                <div class="container">
                    <a class="navbar-brand" routerLink="/">
                        <div class="d-flex gap-2 align-items-center justify-content-center">
                            <span class="logo-sm mb-0">
                                S8
                            </span>
                        </div>
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" routerLink="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" routerLink="/reservations">Reservations</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" routerLink="/fields">
                                    Fields
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <main class="d-flex justify-content-center align-items-center bg-white">
            <div class="container pb-5">
                <router-outlet/>
            </div>
        </main>
    `,
    styles: `
        main {
            --header-height: 67px;
            min-height: calc(100vh - var(--header-height));
        }

        main .container {
            min-height: 60vh;
        }
    `,
})
export class AuthLayoutComponent {

}
