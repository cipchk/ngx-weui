import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuService } from '../../core/menu.service';

@Component({
    selector: 'docs-nav',
    templateUrl: './docs-nav.component.html'
})
export class DocsNavComponent implements OnInit {

    constructor(
        private router: Router,
        private menuService: MenuService
    ) {}

    navList: any[];
    private _data: any[];
    type = '';
    ngOnInit() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(e => {
                this.updateData();
                window.scrollTo(0, 0);
            });

        this.updateData();
    }

    updateData() {
        const arr = this.router.url.split('/').filter(w => !!w);
        if (arr.length === 0 || arr[0] === this.type) return;

        this.type = arr[0];
        this._data = this.menuService.getItems(this.type);
        this.onSearch('');
    }

    onSearch(term: string) {
        term = term.toLowerCase();
        this.navList = this._data.filter((w: any) => ~w.name.toLowerCase().indexOf(term));
    }
}
