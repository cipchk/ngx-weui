import {
  Component,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnDestroy,
  ViewChild,
  LOCALE_ID,
  OnChanges,
  SimpleChanges,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PickerOptions } from './options';
import { PickerComponent } from './picker.component';

export const FORMAT: any = {
  format: null,
  yu: '年',
  Mu: '月',
  du: '日',
  hu: '时',
  mu: '分',
};

export type DatePickerType = 'date-ym' | 'date' | 'datetime' | 'time';

export type FORMAT_TYPE =
  | string
  | {
    format: string;
    yu?: string;
    Mu?: string;
    du?: string;
    hu?: string;
    mu?: string;
  };

/**
 * 日期时间选择器
 */
@Component({
  selector: 'weui-date-picker',
  template: `
  <weui-picker [placeholder]="placeholder"
      [groups]="_groups" [defaultSelect]="_selected" [disabled]="disabled" [options]="options"
      (show)="_onShow()"
      (hide)="_onHide()"
      (change)="_onCityChange($event)"
      (groupChange)="_onCityGroupChange($event)"
      (cancel)="_onCityCancelChange()"></weui-picker>
  `,
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent
  implements OnInit, ControlValueAccessor, OnDestroy, OnChanges {
  @ViewChild(PickerComponent) _pickerInstance: PickerComponent;

  _value: Date;
  _groups: any[] = [];
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
  @Input() type: DatePickerType = 'date';

  private _format: any = Object.assign({}, FORMAT);
  /**
   * 日期格式化代码，实际是采用 DatePipe，所有代码内容和它一样
   */
  @Input()
  set format(v: FORMAT_TYPE) {
    if (typeof v === 'string') {
      this._format = Object.assign(FORMAT, {
        format: v,
      });
    } else {
      this._format = Object.assign(FORMAT, v);
    }
  }

  /** 配置项 */
  @Input() options: PickerOptions;
  /** 当options.type=='form'时，占位符文本 */
  @Input() placeholder: string;
  @Input() disabled: boolean;
  /** 确认后回调 */
  @Output() change = new EventEmitter<any>();
  /** 列变更时回调 */
  @Output() groupChange = new EventEmitter<any>();
  /** 取消后回调 */
  @Output() cancel = new EventEmitter<any>();
  /** 显示时回调 */
  @Output() show = new EventEmitter<any>();
  /** 隐藏后回调 */
  @Output() hide = new EventEmitter<any>();

  constructor(private el: ElementRef, private datePipe: DatePipe) { }

  // todo: 太粗暴，需要优化代码
  private genGroups() {
    if (!this._value) this._value = new Date();
    this._groups = [];
    this._selected = [];
    if (~this.type.indexOf('date')) this.genDateGroups();
    if (~this.type.indexOf('time')) this.genDateTimeGroups();
  }

  private genDateGroups() {
    const year = this._value.getFullYear(),
      month = this._value.getMonth() + 1,
      day = this._value.getDate();

    // year
    let _selected = 0,
      startYear = year - 10,
      endYear = year + 10;
    if (this.min) startYear = this.min.getFullYear();
    if (this.max) endYear = this.max.getFullYear();
    this._groups.push(
      Array(endYear - startYear + 1)
        .fill(0)
        .map((v: number, idx: number) => {
          const _v = startYear + idx;
          if (_v === year) _selected = idx;
          return { label: _v + this._format.yu, value: _v };
        }),
    );
    this._selected.push(_selected);

    // month
    const cy = this._groups[0][_selected].value;
    let startMonth = 1,
      endMonth = 12;
    if (cy === startYear) startMonth = this.min.getMonth() + 1;
    if (cy === endYear) endMonth = this.max.getMonth() + 1;
    _selected = 0;
    this._groups.push(
      Array(endMonth - startMonth + 1)
        .fill(0)
        .map((v: number, idx: number) => {
          const _v = startMonth + idx;
          if (_v === month) _selected = idx;
          return { label: _v + this._format.Mu, value: _v };
        }),
    );
    this._selected.push(_selected);

    // day
    if (this.type !== 'date-ym') {
      const cm = this._groups[1][_selected].value;
      let startDay = 1,
        endDay = new Date(year, month, 0).getDate();
      if (cy === startYear && cm === startMonth) startDay = this.min.getDate();
      if (cy === endYear && cm === endMonth) endDay = this.max.getDate();
      _selected = 0;
      this._groups.push(
        Array(endDay - startDay + 1)
          .fill(0)
          .map((v: number, idx: number) => {
            const _v = startDay + idx;
            if (_v === day) _selected = idx;
            return { label: _v + this._format.du, value: _v };
          }),
      );
      this._selected.push(_selected);
    }
  }

  private genDateTimeGroups() {
    const hours = this._value.getHours(),
      minutes = this._value.getMinutes();
    // hours
    let _selected = 0;
    this._groups.push(
      Array(24)
        .fill(0)
        .map((v: number, idx: number) => {
          const _v = idx;
          if (_v === hours) _selected = idx;
          return { label: _v + this._format.hu, value: _v };
        }),
    );
    this._selected.push(_selected);

    // minutes
    _selected = 0;
    this._groups.push(
      Array(60)
        .fill(0)
        .map((v: number, idx: number) => {
          const _v = idx;
          if (_v === minutes) _selected = idx;
          return { label: _v + this._format.mu, value: _v };
        }),
    );
    this._selected.push(_selected);
  }

  // 根据selected
  private genValueBySelected() {
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
    this._groups = null;
  }

  private getFormatDate(date: Date) {
    let f: string = '';
    if (this._format && this._format.format) f = this._format.format;
    else {
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
    return this.datePipe.transform(date, f);
  }

  _onCityChange(data: any) {
    this.genValueBySelected();
    const retVal = new Date(this._value.getTime());
    this.onChange(retVal);
    this.onTouched();

    data.value = retVal;

    data.formatValue = this.getFormatDate(retVal);
    this._pickerInstance._text = data.formatValue;

    this.change.emit(data);
  }

  _onCityGroupChange(res: any) {
    this._selected[res.groupIndex] = res.index;
    if (res.groupIndex !== this._groups.length - 1) {
      this.genValueBySelected().genGroups();
    }

    this.groupChange.emit(res);
  }

  _onCityCancelChange() {
    this.cancel.emit();
  }

  private initFlag = false;
  ngOnInit(): void {
    this.initFlag = true;
    this.genGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initFlag) this.genGroups();
  }

  /** 服务于Service，并无实际意义 */
  _triggerShow() {
    this._pickerInstance._onShow();
  }

  _onShow() {
    this.show.emit();
  }

  _onHide() {
    this.hide.emit();
  }

  writeValue(value: Date): void {
    if (value) this.genGroups();
    this._value = value;
    this._pickerInstance._text =
      value instanceof Date ? this.getFormatDate(value) : '';
  }

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
