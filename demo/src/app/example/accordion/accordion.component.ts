import { Component, Input, Output, ViewEncapsulation, EventEmitter, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'Accordion',
    template: `
        <div [ngClass]="{'js_show': show}">
            <div (click)="onChangeStatus()"><ng-content select="[header]"></ng-content></div>
            <ng-content></ng-content>
        </div>
    `,
    host: {
        '[class.accordion]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class AccordionComponent {

    @Input() show: boolean;
    @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    onChangeStatus() {
        this.show = !this.show;
        this.showChange.emit(this.show);
    }
}
