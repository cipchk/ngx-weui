import { Component } from '@angular/core';

@Component({
    selector: 'CellsTips,[CellsTips]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cells__tips'
    }
})
export class CellsTipsComponent {
    
}
