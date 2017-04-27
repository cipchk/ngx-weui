import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'CellFooter,[CellFooter]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cell__ft'
    }
})
export class CellFooterComponent {

    /**
     * if cell body is the primary block
     * 
     * @type {boolean}
     * @default false;
     */
    @HostBinding('class.weui-cell_primary') @Input() primary: boolean = false;

}
