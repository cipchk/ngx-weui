import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
