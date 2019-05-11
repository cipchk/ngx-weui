import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean, InputNumber } from 'ngx-weui/core';

@Component({
  selector: 'weui-progress',
  exportAs: 'weuiProgress',
  templateUrl: './progress.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProgressComponent {
  _value: number = 0;
  /**
   * 默认进度值，取值范围：0-100（单位：%）
   */
  @Input()
  @InputNumber()
  set value(d: number) {
    this._value = Math.max(0, Math.min(100, d));
    this.cdr.detectChanges();
  }

  /**
   * 是否允许取消，默认：`true`
   */
  @Input() @InputBoolean() canCancel: boolean = true;

  /**
   * 取消回调
   */
  @Output() readonly cancel = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  _onCancel() {
    if (this.canCancel) this.cancel.emit();
    return false;
  }
}
