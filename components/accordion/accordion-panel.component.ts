import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { InputBoolean } from 'ngx-weui/core';
import { AccordionComponent } from './accordion.component';

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

  constructor(@Inject(AccordionComponent) protected accordion: AccordionComponent) {}

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
