import { Component, Input, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'Accordion',
    template: `
        <div (click)="isVisible=!isVisible" [@headState]="!isVisible?'in':'out'"><ng-content select="[header]"></ng-content></div>
        <div [@contentState]="isVisible?'in':'out'"><ng-content></ng-content></div>
    `,
    styleUrls: ['./accordion.component.scss'],
    animations: [
        trigger('headState', [
            state('in', style({
                transition: 'opacity .3s',
                opacity: 1
            })),
            state('out', style({
                transition: 'opacity .3s',
                opacity: .4
            }))
        ]),
        trigger('contentState', [
            state('in', style({
                transform: 'translate3d(0, 0, 0)'
            })),
            state('out', style({
                transform: 'translate3d(0, 100%, 0)',
                height: 0
            })),
            transition('* => *', animate('400ms ease-in-out'))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class AccordionComponent {

    @Input() isVisible: boolean = false;

}
