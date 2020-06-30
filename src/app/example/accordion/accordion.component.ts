import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface AccordionItem {
  disabled: boolean;
  active: boolean;
  title: string;
  list: number[];
}

@Component({
  selector: 'example-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoAccordionComponent implements OnInit {
  collapsible: boolean = false;

  list: AccordionItem[] = [];

  index: number = 0;

  ngOnInit(): void {
    new Array(3).fill(0).forEach(() => this.add());
  }

  add(): void {
    this.list.push({
      disabled: false,
      active: false,
      title: `标题${this.list.length + 1}`,
      list: new Array(this.list.length + 1),
    });
  }

  remove(): void {
    if (this.list.length > 1) {
      this.list.pop();
    }
  }

  select(index: number): void {
    this.index = index;
  }
}
