import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'Page',
    template: `
    <div class="page__hd">
        <h1 class="page__title" [innerHTML]="title"></h1>
        <p class="page__desc" [innerHTML]="subTitle"></p>
    </div>
    <div class="page__bd" [ngClass]="{'page__bd_spacing': spacing}"><ng-content></ng-content></div>
    <div class="page__ft" [ngClass]="{'j_bottom': ftBottom}" *ngIf="!noBottom">
        <a href="#" routerLink="/"><img src="./assets/images/icon_footer.png"></a>
        <ng-content select="[footer]"></ng-content>
    </div>
    `,
    host: {
        'class': 'page'
    },
    styleUrls: [ './page.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class PageComponent {
    @Input() title: string;
    @Input() subTitle: string;
    @Input() spacing: boolean = true;
    @Input() ftBottom: boolean = false;
    @Input() noBottom: boolean = false;
}
