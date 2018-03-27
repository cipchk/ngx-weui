import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { META } from '../meta';

@Component({
    selector: 'app-docs-article',
    templateUrl: './article.component.html',
    styles: [
        `:host {
            display: block;
            overflow-y: auto;
            height: 100%;
        }`
    ]
})
export class DocsArticleComponent implements OnInit {

    item: any;

    private genData(id: string) {
        const item = META.find(w => w.name === id);
        if (!item) {
            this.router.navigateByUrl('/');
            return ;
        }
        this.item = Object.assign({
        }, item);
        this.initHLJS();
    }

    constructor(
        private router: Router,
        route: ActivatedRoute
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

}
