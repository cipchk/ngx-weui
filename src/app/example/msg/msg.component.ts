import { Component, ViewEncapsulation, Input } from '@angular/core';
@Component({
    selector: 'example-msg',
    templateUrl: './msg.component.html',
    styleUrls: [ './msg.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class DemoMsgComponent {
    @Input() url: string = 'example';
}
