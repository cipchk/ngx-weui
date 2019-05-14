import {
  forwardRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ngx-weui/core';
import { PickerData } from './data';
import { PickerOptions } from './options';
import { PickerConfig } from './picker.config';

@Component({
  selector: 'weui-picker',
  exportAs: 'weuiPicker',
  templateUrl: './picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickerComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  /** 配置项 */
  @Input() options: PickerOptions;

  _value: any;
  _selected: any[];
  _groups: PickerData[][];

  /**
   * 当前默认位置，数组的长度必须等同于 groups 长度
   */
  @Input()
  set defaultSelect(d: number[]) {
    if (d) this._selected = d;
  }

  /**
   * 多列数据，以数组的长度来决定几列数据
   * 支持string[]单列数组，单纯只是为了方便
   */
  @Input()
  set groups(d: PickerData[][] | string[]) {
    if (!d) throw new Error('无效数据源');
    if (d.length > 0) {
      if (typeof d[0] === 'string') {
        d = [
          (d as string[]).map<PickerData>((v: string) => {
            return { label: v, value: v };
          }),
        ];
      }
    }
    this._groups = d as PickerData[][];
    this._selected = this._selected ? this._selected : Array(d.length).fill(0);
  }

  _text: string = '';

  /** 当 `options.type==='form'` 时，占位符文本 */
  @Input() placeholder: string;
  @Input() @InputBoolean() disabled: boolean = false;
  /**
   * 确认后回调当前选择数据（包括已选面板所有数据）
   *
   * `{ value: '10000', items: [ {}, {}, {} ] }`
   */
  @Output() readonly change = new EventEmitter<any>();
  /** 列变更时回调 */
  @Output() readonly groupChange = new EventEmitter<any>();
  /** 取消后回调 */
  @Output() readonly cancel = new EventEmitter();
  /** 显示时回调 */
  @Output() readonly show = new EventEmitter();
  /** 隐藏后回调 */
  @Output() readonly hide = new EventEmitter();

  constructor(private DEF: PickerConfig) {}

  ngOnInit() {
    if (!this.options) this.parseOptions();
  }

  _showP: boolean = false;
  _shown: boolean = false;
  _onHide(fh: boolean) {
    if (!fh && !this.options.backdrop) return false;
    this._shown = false;
    setTimeout(() => {
      this._showP = false;
      this.hide.emit();
    }, 300);
    return this;
  }

  _onShow() {
    if (this.disabled) return false;
    this._showP = true;
    this._shown = true;
    this.show.emit();
    return this;
  }

  private parseOptions() {
    this.options = {
      type: 'form',
      cancel: '取消',
      confirm: '确定',
      backdrop: true,
      gruopCount: null,
      separator: ' ',
      ...this.DEF,
      ...this.options,
    } as PickerOptions;
  }

  private getSelecteItem() {
    const res: any[] = [];
    this._groups.forEach((items: PickerData[], idx: number) => {
      const item = items[this._selected[idx]];
      if (item) res.push(item);
    });
    return res;
  }

  _setText(res: any[] | null = null) {
    if (res == null) res = this.getSelecteItem();
    if (res.length > 0) this._text = res.map((i: any) => i.label || i.value).join(this.options.separator);

    return this;
  }

  // 根据_value解析成相应值位置
  _setDefault() {
    this._selected = [];
    this._groups.forEach((items: PickerData[]) => {
      let idx = items.findIndex((i: PickerData) => i.value === this._value);
      if (idx <= -1) idx = 0;
      this._selected.push(idx);
    });
    return this;
  }

  _onGroupChange(data: any, groupIndex: number) {
    this._selected[groupIndex] = data.index;
    this.groupChange.emit({ item: data.item, index: data.index, groupIndex });
  }

  _onCancel() {
    this.cancel.emit();
    this._onHide(true);
    return false;
  }

  _onConfirm() {
    const res = this.getSelecteItem();
    this._setText(res);

    const lastItem = res[res.length - 1] || {};
    const val = lastItem.value || lastItem.label;
    this.onChange(val);
    this.onTouched();

    this.change.emit({ value: val, items: res });

    this._onHide(true);
    return false;
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.options) {
      this.parseOptions();
    }
  }

  writeValue(value: any): void {
    if (!value) this._text = '';
    if (value && value !== this._value) {
      this._value = value;
      // todo：当ngModel传递一个未列表中的值的情况 & 多列时数据对应问题
      this._setDefault()._setText();
    }
  }

  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _onFocus() {
    arguments[0].target.blur();
  }
}
