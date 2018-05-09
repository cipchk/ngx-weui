import { Directive, Input, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { findParent, add, remove } from '../utils/dom';

/**
 * 获取验证码
 */
@Directive({
  selector: '[weui-vcode]',
  host: {
    '(click)': '_onClick()',
    '[disabled]': '_disabled',
  },
})
export class VCodeDirective implements OnInit, OnDestroy {
  /**
   * 发送事件
   */
  @Input('weui-vcode') onSend: () => Observable<boolean>;

  /**
   * 时长（单位：秒），默认：`60`
   */
  @Input('weui-seconds') seconds: number = 60;

  /**
   * 倒计时模板，使用 `${num}` 表示当前秒数
   */
  @Input('weui-tpl') tpl: string = '${num} 秒';

  /**
   * 重新发送提醒文本
   */
  @Input('weui-error') error: string = '重新发送';

  _disabled: boolean = false;
  private _cur: string;
  private _t: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (typeof this.onSend !== 'function')
      console.error('weui-vcode必须传递一个返回值为 `Observable<boolean>` 函数');
    this._cur = this.el.nativeElement.innerHTML;
  }

  _onClick() {
    this._disabled = true;
    this.onSend().subscribe(res => {
      res ? this.tick() : this.err();
    });
  }

  private err(): void {
    this._disabled = false;
    this.el.nativeElement.innerHTML = this.error;
  }

  private tick(): void {
    let count = this.seconds < 1 ? 1 : this.seconds;
    this.setText(count);
    this._t = setInterval(() => {
      if (--count <= 0) {
        this._disabled = false;
        this.el.nativeElement.innerHTML = this._cur;
        this.destroy();
      } else this.setText(count);
    }, 1000);
  }

  private setText(num: number): void {
    this.el.nativeElement.innerHTML = this.tpl.replace(
      /\${num}/,
      num.toString(),
    );
  }

  private destroy() {
    if (this._t) {
      clearInterval(this._t);
      this._t = null;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
