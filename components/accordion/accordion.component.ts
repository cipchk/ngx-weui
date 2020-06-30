import { ChangeDetectionStrategy, Component, EventEmitter, Host, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AnimateType, InputBoolean } from 'ngx-weui/core';
import { AccordionConfig } from './accordion.config';

@Component({
  selector: 'weui-accordion-panel',
  exportAs: 'weuiAccordionPanel',
  template: `
    <div role="tab" (click)="_toggle()"><ng-content select="[heading]"></ng-content></div>
    <div role="tabpanel" class="weui-accordion-content"><ng-content></ng-content></div>
  `,
  host: {
    '[class.weui-accordion-panel-disabled]': 'disabled',
    '[class.weui-accordion-active]': 'active',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AccordionPanelComponent implements OnInit, OnDestroy {
  /**
   * 是否禁止
   */
  @Input() @InputBoolean() disabled: boolean = false;

  private _active: boolean = false;

  /**
   * 是否展开
   */
  @Input()
  @InputBoolean()
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
    if (value) {
      this.accordion._closeOthers(this);
    }
  }

  constructor(@Host() protected accordion: AccordionComponent) {}

  ngOnInit(): void {
    this.accordion._add(this);
  }

  ngOnDestroy(): void {
    this.accordion._remove(this);
  }

  _toggle(): void {
    if (!this.disabled) {
      this.active = !this.active;
      this.accordion.select.emit(this.accordion._index(this));
    }
  }
}

@Component({
  selector: 'weui-accordion',
  exportAs: 'weuiAccordion',
  template: ` <ng-content></ng-content> `,
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
  @Input() @InputBoolean() collapsible = false;
  /**
   * 自动展开第一次，默认：`true`
   */
  @Input() @InputBoolean() activeFirst = true;
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

  _add(item: AccordionPanelComponent): void {
    this.panels.push(item);
    if (this.panels.length === 1 && this.activeFirst) {
      item.active = true;
    }
  }

  _remove(item: AccordionPanelComponent): void {
    this.panels.splice(this.panels.indexOf(item), 1);
  }

  _index(item: AccordionPanelComponent): number {
    return this.panels.indexOf(item);
  }

  _closeOthers(cur: AccordionPanelComponent): void {
    if (this.collapsible) {
      return;
    }

    this.panels.forEach(panel => {
      if (!panel.disabled && panel !== cur) {
        panel.active = false;
      }
    });
  }
}
