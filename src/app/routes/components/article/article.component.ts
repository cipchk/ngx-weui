import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../core/menu.service';
import { META } from '../meta';
import { EXAMPLE } from '../examples';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styles: [
        `:host { display: block; height: 100%; }`
    ]
})
export class ArticleComponent implements OnInit {

    menu: any;
    item: any;

    private genData(id: string) {
        const menu =  { ...this.menuService.getItems('components').find(w => w.name.toLowerCase() === id) };
        this.menu = Object.assign({
            id: menu.example || menu.name.toLowerCase()
        }, menu);
        if (!this.menu.id) {
            this.router.navigateByUrl('/');
            return ;
        }
        this.item = Object.assign({
            name: this.menu.id,
            data: {},
            meta: {
                title: this.menu.name,
                subtitle: ''
            }
        }, META.find(w => w.name === (this.menu.api || id)));

        // examples
        const example = EXAMPLE[menu.example || this.menu.id];
        if (!!example) this.item.demo = example;
        this.initHLJS();
    }

    constructor(
        private router: Router,
        route: ActivatedRoute,
        private menuService: MenuService
    ) {
        route.params.subscribe(params => this.genData('' + params['id']));
    }

    ngOnInit(): void {
        this.initHLJS();
    }

    private initHLJS() {
        setTimeout(() => {
            const elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
            for (let i = 0, element; element = elements[i++];) {
                hljs.highlightBlock(element);
            }
        }, 250);
    }

    changeCode() {
       // this.initHLJS();
    }

}
