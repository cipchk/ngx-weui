import {
  Component,
  forwardRef,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PickerData } from './data';
import { PickerOptions } from './options';
import { PickerConfig } from './picker.config';

@Component({
  selector: 'weui-picker',
  template: `
    <input type="text" class="weui-input" value="{{_text}}" placeholder="{{placeholder}}"
      readonly="readonly" (focus)="_onFocus($event)"
      (click)="_onShow()" [disabled]="disabled" *ngIf="options.type==='form'">
    <div [hidden]="!_showP">
      <div class="weui-mask" (click)="_onHide(false)"
        [ngClass]="{'weui-animate-fade-in': _shown, 'weui-animate-fade-out': !_shown}"></div>
      <div class="weui-picker"
          [ngClass]="{'weui-animate-slide-up': _shown, 'weui-animate-slide-down': !_shown}">
        <div class="weui-picker__hd">
          <a href="#" class="weui-picker__action" (click)="_onCancel()">{{options.cancel}}</a>
          <a href="#" class="weui-picker__action" (click)="_onConfirm()">{{options.confirm}}</a>
        </div>
        <div class="weui-picker__bd">
          <weui-picker-group tappable
            *ngFor="let items of _groups; let i = index;"
            [items]="items"
            [defaultIndex]="_selected[i]"
            groupIndex="{{i}}" (change)="_onGroupChange($event, i)"></weui-picker-group>
        </div>
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickerComponent),
      multi: true,
    },
  ],
})
export class PickerComponent
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
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
  set groups(d: PickerData[][] | String[]) {
    if (!d) throw new Error('无效数据源');
    if (d.length > 0) {
      if (typeof d[0] === 'string') {
        d = [
          (<string[]>d).map<PickerData>((v: string) => {
            return { label: v, value: v };
          }),
        ];
      }
    }
    this._groups = <PickerData[][]>d;
    this._selected = this._selected ? this._selected : Array(d.length).fill(0);
  }

  _text: string = '';

  /** 当 `options.type==='form'` 时，占位符文本 */
  @Input() placeholder: string;
  @Input() disabled: boolean = false;
  /**
   * 确认后回调当前选择数据（包括已选面板所有数据）
   *
   * `{ value: '10000', items: [ {}, {}, {} ] }`
   */
  @Output() change = new EventEmitter<any>();
  /** 列变更时回调 */
  @Output() groupChange = new EventEmitter<any>();
  /** 取消后回调 */
  @Output() cancel = new EventEmitter();
  /** 显示时回调 */
  @Output() show = new EventEmitter();
  /** 隐藏后回调 */
  @Output() hide = new EventEmitter();

  constructor(private el: ElementRef, private DEF: PickerConfig) { }

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
    this.options = Object.assign(
      <PickerOptions>{
        type: 'form',
        cancel: '取消',
        confirm: '确定',
        backdrop: true,
        gruopCount: null,
        separator: ' ',
      },
      this.DEF,
      this.options,
    );
  }

  private getSelecteItem() {
    const res: any[] = [];
    this._groups.forEach((items: PickerData[], idx: number) => {
      const item = items[this._selected[idx]];
      if (item) res.push(item);
    });
    return res;
  }

  _setText(res: any[] = null) {
    if (res === null) res = this.getSelecteItem();
    if (res.length > 0)
      this._text = res
        .map((i: any) => i.label || i.value)
        .join(this.options.separator);

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

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes) {
      this.parseOptions();
    }
  }

  ngOnDestroy(): void { }

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

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _onFocus($event: FocusEvent) {
    arguments[0].target.blur();
  }
}
