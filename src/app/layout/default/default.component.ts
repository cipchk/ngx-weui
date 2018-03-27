import { Router, ActivatedRoute, NavigationEnd, RouteConfigLoadStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../core/menu.service';

@Component({
    selector: 'app-layout-default',
    templateUrl: './default.component.html',
    host: {
        '[class.App]': 'true'
    }
})
export class AppLayoutComponent implements OnInit {

    locale: string = 'en-US';
    isFetching = false;

    constructor(public menuService: MenuService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        if (typeof (Storage) !== 'undefined') {
            const val = localStorage.getItem('angular-weuidoc-lang');
            this.locale = val ? val : this.locale;
        }
        this.router.events
            .subscribe(e => {
                if (!this.isFetching && e instanceof RouteConfigLoadStart) {
                    this.isFetching = true;
                }
                if (e instanceof NavigationEnd) {
                    this.isFetching = false;
                    this.showNav(e.urlAfterRedirects);
                }
            });
        this.showNav(this.router.url);
    }

    needNav: boolean = false;
    private showNav(url: string) {
        const key = url.split('?')[0].split('/').filter(w => !!w)[0];
        this.needNav = [ 'components', 'docs' ].includes(key);
    }
}
