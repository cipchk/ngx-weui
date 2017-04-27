import { Component, Input } from '@angular/core';

@Component({
    selector: 'Cell,[Cell]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cell',
        '[class.weui-cell_access]': 'access',
        '[class.weui-cell_link]': 'link'
    }
})
export class CellComponent {

    /**
     * 带跳转的列表项
     * 
     * @type {boolean}
     * @memberOf CellComponent
     */
    @Input() access: boolean = false;

    /**
     * 带跳转的列表项
     * 
     * @type {boolean}
     * @memberOf CellComponent
     */
    @Input() link: boolean = false;

}
