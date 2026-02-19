import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
    label: string;
    link: string;
    icon?: string;
}

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {

    navItems: NavItem[] = [
        { label: 'Home', link: '/' },
        { label: 'Fields', link: '/fields' },
        { label: 'Events', link: '/events' },
        { label: 'FAQs', link: '/faqs' },
    ];

}
