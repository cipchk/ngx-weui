import { Component, Input } from '@angular/core';

@Component({
    selector: 'FlexItem,[FlexItem]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-flex__item'
    }
})
export class FlexItemComponent {
}
