import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { InputNumber, NwSafeAny } from 'ngx-weui/core';
import { PickerData, PickerGroupChange } from './picker.types';

@Component({
  selector: 'weui-picker-group',
  exportAs: 'weuiPickerGroup',
  templateUrl: './picker-group.component.html',
  host: {
    '[class.weui-picker__group]': 'true',
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PickerGroupComponent implements OnChanges {
  /** 数据列表 */
  @Input() items: PickerData[];
  /** 当前默认位置 */
  @Input() @InputNumber() defaultIndex: number = -1;
  /** 多列中的位置 */
  @Input() @InputNumber() groupIndex: number;
  /** 变更回调 */
  @Output() readonly change = new EventEmitter<PickerGroupChange>();

  private defaults = {
    offset: 2, // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
    rowHeight: 48, // 列表每一行的高度
    bodyHeight: 5 * 48, // picker的高度，用于辅助点击滚动的计算
    inertiaTime: 150, // 惯性滑动的保持时间，此值直接影响“灵敏度” (单位：ms)
    slideDuration: 300, // 惯性滑动的动画时间，表现为最终可视化的效果
  };

  private startTime: number; // 开始触摸的时间
  private startY: number; // 保存开始按下的位置 (touchstart)
  private endY: number; // 保存结束时的位置 (touchend)
  private speed: number; // 手滑动的速度 (用途：速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离)
  _animating: boolean = false;
  _distance = 0;

  constructor(@Inject(DOCUMENT) private doc: NwSafeAny) {}

  private _getWin(): Window {
    return this.doc.defaultView || window;
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.defaultIndex) {
      if (this.defaultIndex < 0 || (this.items && this.defaultIndex >= this.items.length)) {
        this.defaultIndex = 0;
      }
      this._distance = (this.defaults.offset - this.defaultIndex) * this.defaults.rowHeight;
    }
  }

  onTouchStart(e: TouchEvent): void {
    if (this.items.length <= 1) {
      return;
    }

    this.startY = e.changedTouches[0].pageY;
    this.startTime = +new Date();
  }

  onTouchMove(e: TouchEvent): void {
    if (this.items.length <= 1) {
      return;
    }

    const endTime = +new Date();
    this.endY = e.changedTouches[0].pageY;

    // 计算滑动的速度: 距离 / 时间
    const _distance: number = this.endY - this.startY;
    this.speed = _distance / (endTime - this.startTime);

    // 重新设置开始时间、开始位置
    this.startTime = endTime;
    this.startY = this.endY;
    this._animating = false; // ms
    this._distance += _distance; // 内容移动的距离

    e.preventDefault();
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.startY) {
      return;
    }
    this.endY = event.changedTouches[0].pageY;

    /**
     * 思路:
     * 根据最后一次touchmove事件的速度(speed)，判断是否执行惯性滑动；
     * 如果speed大于1、小于5，则根据速度乘以惯性滑动的时间(如150ms)，计算出应该滑动的距离；
     * 如果speed大于5，则按照屏幕的高度(减去列表高度的一半)，作为该滑动的距离。
     */
    const _speed = Math.abs(this.speed);
    if (_speed >= 5) {
      const windowY = this._getWin().innerHeight - this.defaults.bodyHeight / 2;
      this.stop(windowY - this.endY);
    } else if (_speed >= 1) {
      const diff = this.speed * this.defaults.inertiaTime; // 滑行 150ms,这里直接影响“灵敏度”
      this.stop(diff);
    } else {
      this.stop(0);
    }
    this.startY = 0;
  }

  private stop(diff: number): void {
    let dist = this._distance + diff;
    const defaults = this.defaults;

    // 移动到最接近的那一行
    dist = Math.round(dist / defaults.rowHeight) * defaults.rowHeight;
    const max = this._getMax(defaults.offset, defaults.rowHeight);
    const min = this._getMin(defaults.offset, defaults.rowHeight, this.items.length);

    // 不要超过最大值或者最小值
    dist = Math.max(Math.min(dist, max), min);

    // 如果是 disabled 的就跳过
    let index = defaults.offset - dist / defaults.rowHeight;
    while (!!this.items[index] && this.items[index].disabled) {
      diff > 0 ? ++index : --index;
    }
    dist = (defaults.offset - index) * defaults.rowHeight;

    this._animating = true;
    this._distance = dist; // px

    // 触发选择事件
    this.onChange(this.items[index], index);
  }

  private onChange(item: PickerData, index: number = 0): void {
    this.change.emit({ item, index, groupIndex: this.groupIndex });
  }

  private _getMax(offset: number, rowHeight: number): number {
    return offset * rowHeight;
  }

  private _getMin(offset: number, rowHeight: number, length: number): number {
    return -(rowHeight * (length - offset - 1));
  }
}
