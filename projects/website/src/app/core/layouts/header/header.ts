import { NgClass } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
    label: string;
    link: string;
    icon?: string;
}

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, NgClass],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header implements OnInit {

    isHomePage = input.required<boolean>();

    navItems: NavItem[] = [
        { label: 'Home', link: '/home' },
        { label: 'Fields', link: '/fields' },
        { label: 'Reservations', link: '/reservations' },
        { label: 'Events', link: '/events' },
        { label: 'FAQs', link: '/faqs' },
    ];

    ngOnInit(): void {
        console.log("🚀 ~ Header:", this.isHomePage())
    }
}
