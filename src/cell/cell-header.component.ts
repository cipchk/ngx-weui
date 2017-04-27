import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'CellHeader,[CellHeader]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cell__hd'
    }
})
export class CellHeaderComponent {

    /**
     * if cell body is the primary block
     * 
     * @type {boolean}
     * @default false;
     */
    @HostBinding('class.weui-cell_primary') @Input() primary: boolean = false;

}
