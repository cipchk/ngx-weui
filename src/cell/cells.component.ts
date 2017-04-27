import { Component } from '@angular/core';

@Component({
    selector: 'Cells,[Cells]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-cells'
    }
})
export class CellsComponent {
    
}
