import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <theme-btn></theme-btn>
  `,
})
export class AppComponent {}
