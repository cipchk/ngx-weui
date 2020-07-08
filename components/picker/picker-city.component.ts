import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerBaseComponent } from './picker-base.component';
import { PickerComponent } from './picker.component';
import { PickerChangeData, PickerCityData, PickerCityDataMap, PickerGroupChange } from './picker.types';

const DATA_MAP: PickerCityDataMap = {
  label: 'name',
  value: 'code',
  items: 'sub',
};
/**
 * 城市选择器（并不包含城市数据，可以参考示例中的数据格式）
 */
@Component({
  selector: 'weui-city-picker',
  exportAs: 'weuiCityPicker',
  template: `
    <weui-picker
      [placeholder]="placeholder"
      [groups]="_groups!"
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
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityPickerComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CityPickerComponent extends PickerBaseComponent implements ControlValueAccessor, OnDestroy {
  @Input()
  set dataMap(val: PickerCityDataMap) {
    this._dataMap = {
      ...DATA_MAP,
      ...val,
    };
  }
  @Input()
  set data(d: PickerCityData[]) {
    this._tmpData = d;
    this.parseData(this._tmpData, this._dataMap.items, this._selected);
  }
  @ViewChild(PickerComponent, { static: true }) private readonly pickerComp: PickerComponent;
  @Output() readonly change = new EventEmitter<PickerChangeData>();

  private _tmpData: PickerCityData[] | null = null;
  private _dataMap = DATA_MAP;
  _value: string;
  _groups: PickerCityData[][] | null = [];
  _selected: number[] = [];
  private onChange = (_: string) => {};
  private onTouched = () => {};

  private parseData(
    data: PickerCityData[],
    subKey: string,
    selected: number[] = [],
    group: PickerCityData[][] = [],
    newSelected: number[] = [],
  ): { groups: PickerCityData[][]; newSelected: number[] } {
    let _selected = 0;

    if (Array.isArray(selected) && selected.length > 0) {
      const _selectedClone = selected.slice(0);
      _selected = _selectedClone.shift()!;
      selected = _selectedClone;
    }

    if (typeof data[_selected] === 'undefined') {
      _selected = 0;
    }

    newSelected.push(_selected);

    const item = data[_selected];

    const _group = JSON.parse(JSON.stringify(data)) as PickerCityData[];
    const map = this._dataMap;
    _group.forEach((g: PickerCityData) => {
      delete g[subKey];
      g.label = g[map.label];
      g.value = g[map.value];
    });
    group.push(_group);

    if (typeof item[subKey] !== 'undefined' && Array.isArray(item[subKey])) {
      return this.parseData(item[subKey], subKey, selected, group, newSelected);
    } else {
      this._groups = group;
      this._selected = newSelected;
      return { groups: group, newSelected };
    }
  }

  /**
   * 将值转换成位置
   */
  private valueToSelect(data: PickerCityData[], subKey: string, dept: number = 1, newSelected: number[] = []): number[] {
    const code = (this._value.substr(0, dept * 2) + '0000').substr(0, 6);
    let _selected = data.findIndex((w: PickerCityData) => w[this._dataMap.value] === code);
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
        this.pickerComp._setText();
      }, 100);
      return newSelected;
    }
  }

  _onChange(data: PickerChangeData): void {
    this.onChange(data.value);
    this.onTouched();

    this.change.emit(data);
  }

  _onGroupChange(res: PickerGroupChange): void {
    this._selected[res.groupIndex] = res.index;
    if (res.groupIndex !== 2) {
      this.parseData(this._tmpData!, this._dataMap.items, this._selected);
    }

    this.groupChange.emit(res);
  }

  _onCityCancelChange(): void {
    this.cancel.emit();
  }

  /** 服务于Service，并无实际意义 */
  _triggerShow(): void {
    this.pickerComp._onShow();
  }

  _onShow(): void {
    this.show.emit();
  }

  _onHide(): void {
    this.hide.emit();
  }

  writeValue(value: string): void {
    if (!value) {
      this.pickerComp._text = '';
      return;
    }
    this._value = value;
    if (this._value && this._value.length === 6) {
      const items = this._dataMap.items;
      this.valueToSelect(this._tmpData!, items, 1);
      this.parseData(this._tmpData!, items, this._selected);
    }
  }

  registerOnChange(fn: (_: string) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this._tmpData = null;
    this._groups = null;
  }
}
