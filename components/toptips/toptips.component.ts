import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { InputNumber, UpdateHostClassService } from 'ngx-weui/core';

export type ToptipsType = 'default' | 'warn' | 'info' | 'primary' | 'success';

@Component({
  selector: 'weui-toptips',
  exportAs: 'weuiToptips',
  template: ` {{ text }}<ng-content></ng-content> `,
  host: {
    '[hidden]': '!_showd',
    '[style.display]': '_showd ? "block" : "none"',
  },
  providers: [UpdateHostClassService],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToptipsComponent implements OnInit, OnChanges, OnDestroy {
  private timer: any;
  _showd: boolean = false;

  /**
   * 文本
   */
  @Input() text: string;
  /**
   * 显示时长后自动关闭（单位：ms），默认：`2000`
   */
  @Input() @InputNumber() time: number = 2000;

  /**
   * 类型
   */
  @Input() type: ToptipsType = 'primary';
  /**
   * 隐藏后回调
   */
  @Output() readonly hide = new EventEmitter();

  constructor(private el: ElementRef, private uhcs: UpdateHostClassService) {}

  private setClassMap(): void {
    const prefixCls = 'weui-toptips';
    const { uhcs, el, type } = this;
    uhcs.updateHostClass(el.nativeElement, {
      [`${prefixCls}`]: true,
      [`${prefixCls}__${type}`]: true,
    });
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(): void {
    this.setClassMap();
  }

  onShow(): this {
    this.destroy();

    this._showd = true;
    this.timer = setTimeout(() => this.onHide(), this.time);
    return this;
  }

  onHide(): void {
    this._showd = false;
    this.hide.emit();
  }

  private destroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
