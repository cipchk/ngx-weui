import { Component } from '@angular/core';

@Component({
    selector: `app-api-{{name}}`,
    template: `<app-docs [item]="item"></app-docs>`,
    styles: [ `:host { display: block } `]
})
export class {{componentName}} {
    item: any = {{{data}}};
}
