import { Component, Input } from '@angular/core';
@Component({
    selector: 'Form,[Form]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cells',
        '[class.weui-cells_form]': '!radio && !checkbox',
        '[class.weui-cells_radio]': 'radio',
        '[class.weui-cells_checkbox]': 'checkbox'
    }
})
export class FormComponent {

    @Input() radio: boolean = false;

    @Input() checkbox: boolean = false;
}
