import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
    disabled: boolean = true;
    loading: boolean = true;
    mini: boolean = true;
}
