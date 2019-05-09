import { Component, EventEmitter, Input, Output, forwardRef, SimpleChanges, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RatingConfig } from './rating.config';

@Component({
  selector: 'weui-rating',
  templateUrl: './rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor, OnChanges {
  /** 配置项 */
  @Input() config: RatingConfig;
  /** 是否只读模式，默认：`false` */
  @Input() readonly: boolean = false;
  /** 选中后回调，参数：选中值 */
  @Output() readonly selected = new EventEmitter<number>();

  _range: any[];
  _value: number;
  _preValue: number;
  _class: string = '';

  constructor(private DEF: RatingConfig) {}

  _setConfig(cog: RatingConfig) {
    const _c = Object.assign(
      {
        states: [],
      },
      this.DEF,
      cog,
    );
    this._class = _c.cls || '';
    const count = _c.states.length || _c.max;
    this._range = Array(count)
      .fill(0)
      .map((v, i) => {
        return Object.assign(
          {
            index: i,
            on: _c.stateOn,
            off: _c.stateOff,
            title: _c.titles[i] || i + 1,
          },
          _c.states[i] || {},
        );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this._setConfig(changes.config.currentValue);
    }
  }

  _rate(value: number): void {
    if (!this.readonly && value >= 0 && value <= this._range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  writeValue(_value: any): void {
    if (_value % 1 !== _value) {
      this._value = Math.round(_value);
      this._preValue = _value;
      return;
    }

    this._preValue = _value;
    this._value = _value;
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
    this.readonly = isDisabled;
  }
}
