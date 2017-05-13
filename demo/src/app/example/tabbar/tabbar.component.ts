import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-tabbar',
    templateUrl: './tabbar.component.html',
    styleUrls: ['./tabbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoTabbarComponent {
    time: number;
    onSelect() {
        this.time = new Date().getTime();
    }
} 
