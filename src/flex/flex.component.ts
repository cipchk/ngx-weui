import { Component } from '@angular/core';

@Component({
    selector: 'Flex,[Flex]',
    template: `<ng-content></ng-content>`,
    host: {
        'class': 'weui-flex'
    }
})
export class FlexComponent {
}
