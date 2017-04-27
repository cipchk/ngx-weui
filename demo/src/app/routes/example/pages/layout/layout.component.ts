import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-layout',
    template: `<router-outlet></router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
}
