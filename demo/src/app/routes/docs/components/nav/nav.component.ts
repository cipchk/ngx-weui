import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { MenuService } from '../../menu.service';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'docs-nav',
    templateUrl: './nav.component.html',
    styleUrls: [ './nav.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DocsNavComponent implements OnInit {

    constructor(private router: Router, private menuService: MenuService) {}

    navList: any[];
    private _data: any[];
    ngOnInit() {
        this.router.events
            .filter(e => e instanceof RoutesRecognized)
            .subscribe((e: RoutesRecognized) => {
                window.scrollTo(0, 0);
            });

        this._data = this.menuService.getItems('components');
        this.onSearch('');
    }

    onSearch(term: string) {
        term = term.toLowerCase();
        this.navList = this._data.filter((w: any) => ~w.name.toLowerCase().indexOf(term));
    }
}
