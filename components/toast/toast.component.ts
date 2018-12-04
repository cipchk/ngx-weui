import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ToastConfig } from './toast.config';

@Component({
  selector: 'weui-toast',
  template: `
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
      <i class="{{icon}} weui-icon_toast"></i>
      <p class="weui-toast__content">{{text}}</p>
    </div>
  `,
  host: {
    '[hidden]': '!_showd',
  },
})
export class ToastComponent implements OnDestroy {
  /**
   * 类型
   */
  @Input()
  set type(_t: 'success' | 'loading') {
    Object.assign(this, this.DEF[_t]);
  }
  /**
   * 文本
   */
  @Input() text: string;
  /**
   * icon图标Class名
   */
  @Input() icon: string;
  /**
   * 显示时长后自动关闭（单位：ms），0 表示永久，默认：`2000`
   */
  @Input() time: number = 2000;
  /**
   * 隐藏后回调
   */
  @Output() hide = new EventEmitter();

  constructor(private DEF: ToastConfig) {
    this.type = 'success';
  }

  _showd: boolean = false;
  private timer: any;

  onShow() {
    this._showd = true;
    if (this.time > 0) {
      this.timer = setTimeout(() => {
        this.onHide();
      }, this.time);
    }
    return this;
  }

  onHide() {
    this._showd = false;
    this.hide.emit();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
