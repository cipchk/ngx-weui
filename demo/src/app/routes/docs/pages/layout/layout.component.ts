import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../../menu.service'

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    host: {
        '[class.App]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class AppLayoutComponent {

    locale: string = 'en-US';

    constructor(public menuService: MenuService, 
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        if (typeof (Storage) !== "undefined") {
            const val = localStorage.getItem('angular-weuidoc-lang');
            this.locale = val ? val : this.locale;
        }
        this.router.events
            .filter(e => e instanceof RoutesRecognized)
            .subscribe((e: RoutesRecognized) => {
                this.showNav(e.url);
            });
        this.showNav();
    }

    needNav:boolean = false;
    private showNav(url?: string) {
        this.needNav = (url || location.hash).toLowerCase().split('?')[0].indexOf('docs/components') !== -1;
    }
}
