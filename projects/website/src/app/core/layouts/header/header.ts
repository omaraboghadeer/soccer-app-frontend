import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
    label: string;
    link: string;
    icon?: string;
    children?: NavItem[];
}

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, NgClass],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {

    isHomePage = input.required<boolean>();

    navItems: NavItem[] = [
        { label: 'Home', link: '/home' },
        // { label: 'Fields', link: '/fields' },
        { label: "Reservations", link: '/reservations'},
        // { 
        //     label: 'Reservations', 
        //     link: '#', 
        //     children: [
        //         { label: "Booking Check", link: "/reservations" },
        //         { label: "New", link: "/reservations/new" },
        //     ] 
        // },
        { label: 'Events', link: '/events' },
        { label: 'FAQs', link: '/faqs' },
    ];
}
