import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../home/menu.service';

@Component({
  selector: 'example-container',
  template: ` <component-container *ngIf="menu" [menu]="menu" [url]="'example'"></component-container> `,
  host: {
    '[class.container]': `true`,
  },
})
export class ExampleContainerComponent implements OnInit {
  constructor(private route: ActivatedRoute, private menuService: MenuService) {}

  menu: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.menu = this.menuService.getMenu(params.id);
    });
  }
}
