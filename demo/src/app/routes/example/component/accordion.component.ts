import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'Accordion',
    template: `
        <div [ngClass]="{'js_show': isShow}">
            <div (click)="isShow=!isShow"><ng-content select="[header]"></ng-content></div>
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./accordion.component.scss'],
    host: {
        '[class.accordion]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class AccordionComponent {

    @Input() isShow: boolean = false;



}
