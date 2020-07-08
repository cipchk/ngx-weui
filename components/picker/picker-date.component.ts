import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerBaseComponent } from './picker-base.component';
import { PickerComponent } from './picker.component';
import {
  PickerData,
  PickerDateChangeData,
  PickerDateFormatFullType,
  PickerDateFormatType,
  PickerDateType,
  PickerGroupChange,
} from './picker.types';

const FORMAT: PickerDateFormatType = {
  format: null,
  yu: '年',
  Mu: '月',
  du: '日',
  hu: '时',
  mu: '分',
};

/**
 * 日期时间选择器
 */
@Component({
  selector: 'weui-date-picker',
  exportAs: 'weuiDatePicker',
  template: `
    <weui-picker
      [placeholder]="placeholder"
      [groups]="_groups"
      [defaultSelect]="_selected"
      [disabled]="disabled"
      [title]="title"
      [options]="options"
      (show)="_onShow()"
      (hide)="_onHide()"
      (change)="_onChange($event)"
      (groupChange)="_onGroupChange($event)"
      (cancel)="_onCityCancelChange()"
    ></weui-picker>
  `,
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DatePickerComponent extends PickerBaseComponent implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  /**
   * 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
   */
  @Input()
  set format(v: PickerDateFormatFullType) {
    if (typeof v === 'string') {
      this._format = { ...FORMAT, format: v };
    } else {
      this._format = { ...FORMAT, ...v };
    }
  }

  private get datePipe(): DatePipe {
    return this.injector.get(DatePipe);
  }
  private initFlag = false;
  private _format: PickerDateFormatType = { ...FORMAT };
  @ViewChild(PickerComponent, { static: true }) private readonly _pickerInstance: PickerComponent;
  _value: Date;
  _groups: PickerData[][] = [];
  _selected: number[] = [];

  /**
   * 最小时间范围
   * - 当前只限定年月日，暂不包括时间范围
   */
  @Input() min: Date;

  /**
   * 最大时间范围
   * - 当前只限定年月日，暂不包括时间范围
   */
  @Input() max: Date;

  /**
   * 类型
   * + `date-ym` 年月
   * + `date` 日期
   * + `datetime` 日期&时间（不包括秒）
   * + `time` 时间（不包括秒）
   */
  @Input() type: PickerDateType = 'date';
  @Output() readonly change = new EventEmitter<PickerDateChangeData>();
  private onChange = (_: Date) => {};
  private onTouched = () => {};

  // todo: 太粗暴，需要优化代码
  private genGroups(): void {
    if (!this._value) {
      this._value = new Date();
    }
    this._groups = [];
    this._selected = [];
    if (~this.type.indexOf('date')) {
      this.genDateGroups();
    }
    if (~this.type.indexOf('time')) {
      this.genDateTimeGroups();
    }
  }

  private genDateGroups(): void {
    const year = this._value.getFullYear();
    const month = this._value.getMonth() + 1;
    const day = this._value.getDate();

    // year
    let _selected = 0;
    let startYear = year - 10;
    let endYear = year + 10;
    if (this.min) {
      startYear = this.min.getFullYear();
    }
    if (this.max) {
      endYear = this.max.getFullYear();
    }
    this._groups.push(
      Array(endYear - startYear + 1)
        .fill(0)
        .map((_v: number, idx: number) => {
          const val = startYear + idx;
          if (val === year) {
            _selected = idx;
          }
          return { label: val + this._format.yu!, value: val };
        }),
    );
    this._selected.push(_selected);

    // month
    const cy = this._groups[0][_selected].value;
    let startMonth = 1;
    let endMonth = 12;
    if (cy === startYear) {
      startMonth = this.min.getMonth() + 1;
    }
    if (cy === endYear) {
      endMonth = this.max.getMonth() + 1;
    }
    _selected = 0;
    this._groups.push(
      Array(endMonth - startMonth + 1)
        .fill(0)
        .map((_v: number, idx: number) => {
          const val = startMonth + idx;
          if (val === month) {
            _selected = idx;
          }
          return { label: val + this._format.Mu!, value: val };
        }),
    );
    this._selected.push(_selected);

    // day
    if (this.type !== 'date-ym') {
      const cm = this._groups[1][_selected].value;
      let startDay = 1;
      let endDay = new Date(year, month, 0).getDate();
      if (cy === startYear && cm === startMonth) {
        startDay = this.min.getDate();
      }
      if (cy === endYear && cm === endMonth) {
        endDay = this.max.getDate();
      }
      _selected = 0;
      this._groups.push(
        Array(endDay - startDay + 1)
          .fill(0)
          .map((_v: number, idx: number) => {
            const val = startDay + idx;
            if (val === day) {
              _selected = idx;
            }
            return { label: val + this._format.du!, value: val };
          }),
      );
      this._selected.push(_selected);
    }
  }

  private genDateTimeGroups(): void {
    const hours = this._value.getHours();
    const minutes = this._value.getMinutes();
    // hours
    let _selected = 0;
    this._groups.push(
      Array(24)
        .fill(0)
        .map((_v: number, idx: number) => {
          const val = idx;
          if (val === hours) {
            _selected = idx;
          }
          return { label: val + this._format.hu!, value: val };
        }),
    );
    this._selected.push(_selected);

    // minutes
    _selected = 0;
    this._groups.push(
      Array(60)
        .fill(0)
        .map((_v: number, idx: number) => {
          const val = idx;
          if (val === minutes) {
            _selected = idx;
          }
          return { label: val + this._format.mu!, value: val };
        }),
    );
    this._selected.push(_selected);
  }

  // 根据selected
  private genValueBySelected(): this {
    if (this.type === 'time') {
      const now = new Date();
      this._value = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        this._groups[0][this._selected[0]].value,
        this._groups[1][this._selected[1]].value,
        0,
      );
      return this;
    }
    const obj = {
      y: this._groups[0][this._selected[0]].value,
      M: this._groups[1][this._selected[1]].value - 1,
      d: this.type !== 'date-ym' ? this._groups[2][this._selected[2]].value : 1,
      h: 0,
      m: 0,
      s: 0,
    };
    if (~this.type.indexOf('time')) {
      obj.h = this._groups[3][this._selected[3]].value;
      obj.m = this._groups[4][this._selected[4]].value;
    }
    this._value = new Date(obj.y, obj.M, obj.d, obj.h, obj.m, obj.s);
    return this;
  }

  ngOnDestroy(): void {
    this._groups.length = 0;
  }

  private getFormatDate(date: Date): string {
    let f = '';
    if (this._format && this._format.format) {
      f = this._format.format;
    } else {
      switch (this.type) {
        case 'date-ym':
          f = 'yyyy-MM';
          break;
        case 'date':
          f = 'yyyy-MM-dd';
          break;
        case 'datetime':
          f = 'yyyy-MM-dd HH:mm:ss';
          break;
        case 'time':
          f = 'HH:mm';
          break;
      }
    }
    return this.datePipe.transform(date, f)!;
  }

  _onChange(data: PickerDateChangeData): void {
    this.genValueBySelected();
    const retVal = new Date(this._value.getTime());
    this.onChange(retVal);
    this.onTouched();

    data.value = retVal;
    data.formatValue = this.getFormatDate(retVal);
    this._pickerInstance._text = data.formatValue;

    this.change.emit(data);
  }

  _onGroupChange(res: PickerGroupChange): void {
    this._selected[res.groupIndex] = res.index;
    if (res.groupIndex !== this._groups.length - 1) {
      this.genValueBySelected().genGroups();
    }

    this.groupChange.emit(res);
  }

  _onCityCancelChange(): void {
    this.cancel.emit();
  }

  ngOnInit(): void {
    this.initFlag = true;
    this.genGroups();
  }

  ngOnChanges(): void {
    if (this.initFlag) {
      this.genGroups();
    }
  }

  /** 服务于Service，并无实际意义 */
  _triggerShow(): void {
    this._pickerInstance._onShow();
  }

  _onShow(): void {
    this.show.emit();
  }

  _onHide(): void {
    this.hide.emit();
  }

  writeValue(value: Date): void {
    if (value) {
      this.genGroups();
    }
    this._value = value;
    this._pickerInstance._text = value instanceof Date ? this.getFormatDate(value)! : '';
  }

  registerOnChange(fn: (_: Date) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
