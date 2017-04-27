import { Component } from '@angular/core';

@Component({
    selector: 'CellsTitle,[CellsTitle]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cells__title'
    }
})
export class CellsTitleComponent {
    
}
