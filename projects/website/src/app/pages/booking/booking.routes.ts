import { Routes } from "@angular/router";
import { BookingLayout } from "./booking.layout";

export const routes: Routes = [
    {
        path: "",
        component: BookingLayout,
        children: [
            {
                path: "create",
                loadComponent: () => import("./pages/create-booking/create-booking.page").then(c => c.CreateBookingPage)
            }
        ]
    }
];