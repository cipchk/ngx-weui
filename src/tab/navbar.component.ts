import { Component, ViewEncapsulation, forwardRef } from '@angular/core';
import { BarComponent } from './bar.component';
import { TabConfig } from './tab.config';

@Component({
    selector: 'weui-navbar,[weui-navbar]',
    template: `
    <div class="weui-navbar">
        <div class="weui-navbar__item" [ngClass]="{'weui-bar__item_on': item.active}"
            *ngFor="let item of tabs" (click)="item.active=true">{{item.heading}}</div>
    </div>
    <div class="weui-tab__panel"><ng-content></ng-content></div>
    `,
    providers: [{provide: BarComponent, useExisting: forwardRef(() => NavbarComponent) }],
    host: {
        '[class.weui-tab]': 'true'
    },
    styles: [
        `weui-navbar{display:block;}.weui-navbar__item[disabled]{color:rgba(0,0,0,.6)}.weui-tab__panel > .weui-tab, .weui-tab__panel > weui-tab {display:none;}.weui-tab__panel > .active {display:block}`,
    ],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent extends BarComponent {
    constructor(config: TabConfig) {
        super(config);
    }
}
