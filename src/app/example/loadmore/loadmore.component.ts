import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-loadmore',
    templateUrl: './loadmore.component.html',
    styleUrls: ['./loadmore.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoLoadmoreComponent {
    type: string = 'loading';
    first: boolean = true;

    onChange() {
        this.first = false;
        this.type = 'loading';
        setTimeout(() => {
            this.type = 'line';
        }, 1000)
    }
} 
