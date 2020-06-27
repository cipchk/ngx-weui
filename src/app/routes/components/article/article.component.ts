import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../core/menu.service';
import { EXAMPLE } from '../examples';
import { META } from '../meta';

declare var hljs: any;

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class ArticleComponent implements OnInit {
  menu: any;
  item: any;

  private genData(id: string) {
    const menu = { ...this.menuService.getItems('components').find(w => w.name.toLowerCase() === id) };
    this.menu = {
      id: menu.example || menu.name.toLowerCase(),
      ...menu,
    };
    if (!this.menu.id) {
      this.router.navigateByUrl('/');
      return;
    }
    this.item = {
      name: this.menu.id,
      data: {},
      meta: {
        title: this.menu.name,
        subtitle: '',
      },
      ...(META as any[]).find(w => w.name === (this.menu.api || id)),
    };

    // examples
    const example = (EXAMPLE as any)[menu.example || this.menu.id];
    if (!!example) this.item.demo = example;
    this.initHLJS();
  }

  constructor(private router: Router, route: ActivatedRoute, private menuService: MenuService) {
    route.params.subscribe(params => this.genData('' + params.id));
  }

  ngOnInit(): void {
    this.initHLJS();
  }

  private initHLJS() {
    setTimeout(() => {
      const elements = document.querySelectorAll(
        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
      );
      // tslint:disable-next-line:no-conditional-assignment
      for (let i = 0, element; (element = elements[i++]); ) {
        hljs.highlightBlock(element);
      }
    }, 250);
  }

  changeCode() {
    // this.initHLJS();
  }
}
