import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from 'ngx-weui/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'weui-mask',
  exportAs: 'weuiMask',
  templateUrl: './mask.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MaskComponent implements OnDestroy {
  private observer: Observer<void>;
  _shown: boolean = false;

  /**
   * 点击是否允许关闭（默认：`false`）
   */
  @Input() @InputBoolean() backdrop: boolean = false;

  /**
   * 内容方向（默认：`vertical`）
   * + `top`: 顶部居中
   * + `bottom`: 底部居中
   * + `vertical-left`: 垂直居左
   * + `vertical`: 垂直居中
   * + `vertical-right`: 垂直居右
   * + `none`: 无
   */
  @Input()
  placement: 'top' | 'bottom' | 'vertical' | 'vertical-left' | 'vertical-right' | 'none' = 'vertical';

  /**
   * 内容背景色
   */
  @Input() bg = '';

  /**
   * 内容为Loading效果（默认：`false`）
   */
  @Input() @InputBoolean() loading = false;

  /**
   * 关闭回调
   */
  @Output() readonly close = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * 显示，并返回一个Observable
   */
  show(): Observable<void> {
    setTimeout(() => {
      this._shown = true;
      this.cdr.detectChanges();
    });
    return Observable.create((observer: Observer<void>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   * @param is_backdrop 是否手动点击关闭（默认：false）
   */
  hide(is_backdrop: boolean = false) {
    if (is_backdrop === true && this.backdrop === false) return false;

    this._shown = false;
    this.cdr.detectChanges();
    this.close.emit();
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (this.observer as Subscription).unsubscribe();
    }
  }
}
