import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoNavbarComponent {
    time: number;
    onSelect() {
        this.time = new Date().getTime();
    }
} 
