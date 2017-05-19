import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MenuService } from './../../menu.service';

import { NavbarComponent } from 'ngx-weui';

@Component({
    selector: 'docs-article',
    templateUrl: './article.component.html',
    styleUrls: [ './article.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DocsArticleComponent {

    @ViewChild('navbar') navbar: NavbarComponent;
    @ViewChild('codebar') codebar: NavbarComponent;

    constructor(private router: Router, 
                private route: ActivatedRoute,
                private menuService: MenuService) {}
    
    id: string = null;
    menu: any;
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            const items = this.menuService.getItems('components');
            for (let item of items) {
                if (item.name.toLowerCase() == this.id) {
                    this.menu = Object.assign({}, item);
                    setTimeout(() => {
                        if (this.menu.doc_overview === true)
                            this.navbar.tabs[0].active = true;
                        else
                            this.navbar.tabs[1].active = true;
                    })
                    return;
                }
            }
        });
    }

    apiUrl() {
        return `./assets/docs/api/${this.menu.api_url || this.id}.html`;
    }

    extFileUrl(ext: string) {
        return `./assets/docs/example/${this.menu.ext_url || this.id}.component-${ext.toLowerCase()}.html`;
    }
}
