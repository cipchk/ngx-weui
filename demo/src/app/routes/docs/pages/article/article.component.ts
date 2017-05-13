import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { MenuService } from './../../menu.service';

@Component({
    selector: 'docs-article',
    templateUrl: './article.component.html',
    styleUrls: [ './article.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DocsArticleComponent {

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
                    return;
                }
            }
        });
    }

    apiUrl() {
        return `./assets/docs/api/${this.menu.api_url || this.id}.html`;
    }

    extFileUrl(ext: string) {
        return `./assets/docs/example/${this.id}.component-${ext.toLowerCase()}.html`;
    }
}
