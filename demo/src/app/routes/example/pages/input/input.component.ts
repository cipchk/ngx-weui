import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-input',
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class InputComponent {
    items1_res: any;
    items1: any[] = [
        { id: 1, name: 'asdf1' },
        { id: 2, name: 'asdf2' }
    ];

    items2_res: any;
    items2: any[] = [ 'A', 'B' ];

    constructor() {
        this.items1_res = this.items1[0];
        this.items2_res = this.items2[1];
    }
}
