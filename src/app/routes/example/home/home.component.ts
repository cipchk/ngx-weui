import { Component } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
    selector: 'example-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    title: string = `<img src="./assets/images/logo.png" alt="weui" height="21px" />`;

    constructor(public menuService: MenuService) {}

    onSelecte(index: number) {
        this.menuService.menus.forEach((item, idx) => {
            item.show = idx === index;
        });
    }
}
