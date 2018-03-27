import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-footer',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
    year: number = new Date().getFullYear();
} 
