import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NwSafeAny } from 'ngx-weui/core';
import { PickerBaseComponent } from './picker-base.component';
import { PickerChangeData, PickerData, PickerGroupChange, PickerOptions } from './picker.types';

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
export class PickerComponent extends PickerBaseComponent implements ControlValueAccessor, OnInit, OnChanges {
  _showP: boolean = false;
  _shown: boolean = false;
  _value: NwSafeAny;
  _selected: number[];
  _groups: PickerData[][];
  _text: string = '';

  /**
   * 确认后回调当前选择数据（包括已选面板所有数据）
   */
  @Output() readonly change = new EventEmitter<PickerChangeData>();

  /**
   * 当前默认位置，数组的长度必须等同于 groups 长度
   */
  @Input()
  set defaultSelect(d: number[]) {
    if (d) {
      this._selected = d;
    }
  }

  /**
   * 多列数据，以数组的长度来决定几列数据
   * 支持string[]单列数组，单纯只是为了方便
   */
  @Input()
  set groups(d: PickerData[][] | string[]) {
    if (!d) {
      throw new Error('无效数据源');
    }
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

  private onChange = (_: NwSafeAny) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.parseOptions();
  }

  _onHide(fh: boolean): this {
    if (!fh && !this.options.backdrop) {
      return this;
    }
    this._shown = false;
    setTimeout(() => {
      this._showP = false;
      this.hide.emit();
    }, 300);
    return this;
  }

  _onShow(): this {
    if (this.disabled) {
      return this;
    }
    this._showP = true;
    this._shown = true;
    this.show.emit();
    return this;
  }

  private parseOptions(): void {
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

  private getSelecteItem(): PickerData[] {
    const res: PickerData[] = [];
    this._groups.forEach((items: PickerData[], idx: number) => {
      const item = items[this._selected[idx]];
      if (item) {
        res.push(item);
      }
    });
    return res;
  }

  _setText(res: PickerData[] | null = null): this {
    if (res == null) {
      res = this.getSelecteItem();
    }
    if (res.length > 0) {
      this._text = res.map((i: PickerData) => i.label || i.value).join(this.options.separator);
    }

    return this;
  }

  // 根据_value解析成相应值位置
  _setDefault(): this {
    this._selected = [];
    this._groups.forEach((items: PickerData[]) => {
      let idx = items.findIndex((i: PickerData) => i.value === this._value);
      if (idx <= -1) {
        idx = 0;
      }
      this._selected.push(idx);
    });
    return this;
  }

  _onGroupChange(data: PickerGroupChange, groupIndex: number): void {
    this._selected[groupIndex] = data.index;
    this.groupChange.emit({ item: data.item, index: data.index, groupIndex });
  }

  _onCancel(): boolean {
    this.cancel.emit();
    this._onHide(true);
    return false;
  }

  _onConfirm(): boolean {
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

  writeValue(value: NwSafeAny): void {
    if (!value) {
      this._text = '';
    }
    if (value && value !== this._value) {
      this._value = value;
      // todo：当ngModel传递一个未列表中的值的情况 & 多列时数据对应问题
      this._setDefault()._setText();
    }
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (_: NwSafeAny) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _onFocus(ev: Event): void {
    (ev.target! as HTMLElement).blur();
  }
}
