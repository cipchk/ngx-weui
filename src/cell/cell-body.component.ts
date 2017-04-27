import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'CellBody,[CellBody]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cell__bd'
    }
})
export class CellBodyComponent {

    /**
     * if cell body is the primary block
     * 
     * @type {boolean}
     * @default false;
     */
    @HostBinding('class.weui-cell_primary') @Input() primary: boolean = false;

}
