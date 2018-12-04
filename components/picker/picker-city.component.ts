import {
  Component,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerOptions } from './options';
import { PickerComponent } from './picker.component';

/**
 * 城市选择器（并不包含城市数据，可以参考示例中的数据格式）
 */
@Component({
  selector: 'weui-city-picker',
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
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityPickerComponent),
      multi: true,
    },
  ],
})
export class CityPickerComponent implements ControlValueAccessor, OnDestroy {
  @ViewChild(PickerComponent) _pickerInstance: PickerComponent;

  _value: string;
  _groups: any[] = [];
  _selected: number[] = [];
  private _tmpData: any;

  @Input()
  dataMap: { label: string; value: string; items: string } = {
    label: 'name',
    value: 'code',
    items: 'sub',
  };
  /** 城市数据，可以参考示例中的数据格式 */
  @Input()
  set data(d: any) {
    this._tmpData = d;
    this.parseData(this._tmpData, this.dataMap.items, this._selected);
  }
  /** 配置项 */
  @Input() options: PickerOptions;
  /** 当options.type=='form'时，占位符文本 */
  @Input() placeholder: string;
  @Input() disabled: boolean;
  /**
   * 确认后回调当前选择数据（包括已选面板所有数据）
   *
   * `{ value: '10000', items: [ {}, {}, {} ] }`
   */
  @Output() change = new EventEmitter<any>();
  /** 列变更时回调 */
  @Output() groupChange = new EventEmitter<any>();
  /** 取消后回调 */
  @Output() cancel = new EventEmitter<any>();
  /** 显示时回调 */
  @Output() show = new EventEmitter<any>();
  /** 隐藏后回调 */
  @Output() hide = new EventEmitter<any>();

  ngOnDestroy(): void {
    this._tmpData = null;
    this._groups = null;
  }

  private parseData(
    data: any,
    subKey: any,
    selected: any[] = [],
    group: any[] = [],
    newselected: any[] = [],
  ): any {
    let _selected = 0;

    if (Array.isArray(selected) && selected.length > 0) {
      const _selectedClone = selected.slice(0);
      _selected = _selectedClone.shift();
      selected = _selectedClone;
    }

    if (typeof data[_selected] === 'undefined') {
      _selected = 0;
    }

    newselected.push(_selected);

    const item = data[_selected];

    const _group = JSON.parse(JSON.stringify(data));
    _group.forEach((g: any) => {
      delete g[subKey];
      g.label = g[this.dataMap.label];
      g.value = g[this.dataMap.value];
    });
    group.push(_group);

    if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
      return this.parseData(item[subKey], subKey, selected, group, newselected);
    } else {
      this._groups = group;
      this._selected = newselected;
      return { groups: group, newselected };
    }
  }

  /**
   * 将值转换成位置
   */
  private valueToSelect(
    data: any,
    subKey: any,
    dept: number = 1,
    newSelected: any[] = [],
  ): any {
    const code = (this._value.substr(0, dept * 2) + '0000').substr(0, 6);
    let _selected = data.findIndex((w: any) => w[this.dataMap.value] === code);
    if (_selected <= -1) {
      _selected = 0;
    }
    newSelected.push(_selected);

    const item = data[_selected];
    if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
      return this.valueToSelect(item[subKey], subKey, ++dept, newSelected);
    } else {
      this._selected = newSelected;
      setTimeout(() => {
        this._pickerInstance._setText();
      }, 100);
      return newSelected;
    }
  }

  _onCityChange(data: any) {
    this.onChange(data.value);
    this.onTouched();

    this.change.emit(data);
  }

  _onCityGroupChange(res: any) {
    this._selected[res.groupIndex] = res.index;
    if (res.groupIndex !== 2)
      this.parseData(this._tmpData, this.dataMap.items, this._selected);

    this.groupChange.emit(res);
  }

  _onCityCancelChange() {
    this.cancel.emit();
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

  writeValue(value: any): void {
    if (!value) {
      this._pickerInstance._text = '';
      return;
    }
    this._value = value;
    if (this._value && this._value.length === 6) {
      this.valueToSelect(this._tmpData, this.dataMap.items, 1);
      this.parseData(this._tmpData, this.dataMap.items, this._selected);
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
}
