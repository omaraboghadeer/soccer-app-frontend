import { Route } from "@angular/router";
import { AuthLayoutComponent } from "./auth.component";

export const AUTH_ROUTES: Route[] = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: "login",
                loadComponent: () => import('./pages/login/login.page').then(p => p.LoginPage)
            },
            {
                path: "register",
                loadComponent: () => import('./pages/register/register.page').then(p => p.RegisterPage)
            }
        ]
    },
];