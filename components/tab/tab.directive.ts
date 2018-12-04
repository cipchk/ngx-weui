import {
  Directive,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { BarComponent } from './bar.component';

@Directive({ selector: 'weui-tab, [weui-tab]' })
export class TabDirective implements OnDestroy {
  /** 选项卡名称 */
  @Input() heading: string;
  /** 是否禁用 */
  @Input() disabled: boolean;
  /** icon图标，支持HTML */
  @Input() icon: string;
  /** 徽章内容，支持数字或圆点 */
  @Input() badge: number | 'dot';

  /** 当tab激活时触发 */
  @Output() readonly select = new EventEmitter<TabDirective>();
  /** 当tab无效时触发 */
  @Output() readonly deselect = new EventEmitter<TabDirective>();
  /** 当tab移除时触发 */
  @Output() readonly removed = new EventEmitter<TabDirective>();

  /**
   * 激活
   */
  @HostBinding('class.active')
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(active: boolean) {
    if ((this.disabled && active) || !active) {
      if (!active) {
        this._active = active;
      }

      this.deselect.emit(this);
      return;
    }

    this._active = active;
    this._tabComp.tabs.filter(t => t !== this).forEach(tab => tab.active = false);
  }

  protected _active: boolean;
  protected _tabComp: BarComponent;

  constructor(tab: BarComponent) {
    this._tabComp = tab;
    this._tabComp.add(this);
  }

  ngOnDestroy(): void {
    this._tabComp.remove(this);
  }
}
