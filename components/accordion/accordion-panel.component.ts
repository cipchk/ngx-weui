import {
  Component,
  Input,
  Inject,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AccordionComponent } from './accordion.component';

@Component({
  selector: 'weui-accordion-panel',
  template: `
    <div role="tab" (click)="_toggle($event)"><ng-content select="[heading]"></ng-content></div>
    <div role="tabpanel" class="weui-accordion-content"><ng-content></ng-content></div>
    `,
  host: {
    '[class.weui-accordion-panel-disabled]': 'disabled',
    '[class.weui-accordion-active]': 'active',
  }
})
export class AccordionPanelComponent implements OnInit, OnDestroy {
  /**
   * 是否禁止
   */
  @Input() disabled: boolean = false;

  private _active: boolean = false;

  /**
   * 是否展开
   */
  @Input()
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
    if (value) this.accordion._closeOthers(this);
  }

  constructor(
    @Inject(AccordionComponent) protected accordion: AccordionComponent,
  ) { }

  ngOnInit() {
    this.accordion._add(this);
  }

  ngOnDestroy() {
    this.accordion._remove(this);
  }

  _toggle(event: Event) {
    if (!this.disabled) {
      this.active = !this.active;
      this.accordion.select.emit(this.accordion._index(this));
    }
  }
}
