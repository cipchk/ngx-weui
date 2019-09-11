import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AnimateType, InputBoolean } from 'ngx-weui/core';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionConfig } from './accordion.config';

@Component({
  selector: 'weui-accordion',
  exportAs: 'weuiAccordion',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[attr.aria-multiselectable]': 'collapsible',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent {
  /**
   * 是否可折叠，`true` 表示同时所有都允许展开，`false` 表示同时只允许一个展开，默认：`false`
   */
  @Input() @InputBoolean() collapsible: boolean = false;
  /**
   * 自动展开第一次，默认：`true`
   */
  @Input() @InputBoolean() activeFirst: boolean = true;
  /**
   * 动画类型，`none` 无动画，`slide` 滑动，默认：`slide`
   */
  @Input() _animate: AnimateType = 'slide';

  /**
   * 展开时回调，参数为面板下标。
   */
  @Output() readonly select = new EventEmitter<number>();

  private panels: AccordionPanelComponent[] = [];

  constructor(config: AccordionConfig) {
    Object.assign(this, config);
  }

  _add(item: AccordionPanelComponent) {
    this.panels.push(item);
    if (this.panels.length === 1 && this.activeFirst) item.active = true;
  }

  _remove(item: AccordionPanelComponent) {
    this.panels.splice(this.panels.indexOf(item), 1);
  }

  _index(item: AccordionPanelComponent) {
    return this.panels.indexOf(item);
  }

  _closeOthers(cur: AccordionPanelComponent) {
    if (this.collapsible) return;

    this.panels.forEach(panel => {
      if (!panel.disabled && panel !== cur) panel.active = false;
    });
  }
}
