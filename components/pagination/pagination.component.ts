import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean, InputNumber } from 'ngx-weui/core';
import { PaginationConfig } from './pagination.config';
import { PaginationMode } from './pagination.type';

@Component({
  selector: 'weui-pagination',
  exportAs: 'weuiPagination',
  templateUrl: './pagination.component.html',
  host: {
    class: 'weui-pagination',
    '[class.weui-pagination__non-mini]': '!mini',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnChanges {
  _ptArr: number[] = [];
  _prevDisabled = false;
  _nextDisabled = false;
  /**
   * 形态，可选 `button`,`pointer`，默认：`button`
   */
  @Input() mode: PaginationMode;
  /** 当前索引 */
  @Input() @InputNumber() current: number = 0;
  /** 数据总数 */
  @Input() @InputNumber() total: number = 0;
  /**
   * 是否隐藏数值，默认：`false`
   */
  @Input() @InputBoolean() simple: boolean;
  /**
   * 小号按钮，默认：`true`
   */
  @Input() @InputBoolean() mini: boolean = true;
  /**
   * 上一页文本（支持HTML），默认：`上一页`
   */
  @Input() prevText: string;
  /**
   * 下一页文本（支持HTML），默认：`下一步`
   */
  @Input() nextText: string;
  /** 分页触发的回调函数 */
  @Output() readonly change = new EventEmitter<number>();

  constructor(cog: PaginationConfig) {
    Object.assign(this, cog);
  }

  ngOnChanges(): void {
    if (this.mode === 'pointer')
      this._ptArr = Array(this.total)
        .fill(1)
        .map((v, i) => v + i);
    this._checkDisabled();
  }

  _checkDisabled() {
    if (this.mode === 'pointer') return;
    this._prevDisabled = this.current <= 1;
    this._nextDisabled = this.current >= this.total;
  }

  _goto(value: number) {
    if (value === -1 && this._prevDisabled) return false;
    if (value === 1 && this._nextDisabled) return false;

    this.current += value;
    this._checkDisabled();
    this.change.emit(this.current);
  }
}
