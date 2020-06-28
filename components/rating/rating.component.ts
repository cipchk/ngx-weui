import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'ngx-weui/core';
import { RatingConfig } from './rating.config';

@Component({
  selector: 'weui-rating',
  exportAs: 'weuiRating',
  templateUrl: './rating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RatingComponent implements ControlValueAccessor, OnChanges {
  private onChange: any = Function.prototype;
  // private onTouched: any = Function.prototype;
  _range: any[];
  _value: number;
  _preValue: number;
  _class: string = '';

  /** 配置项 */
  @Input() config: RatingConfig;
  /** 是否只读模式，默认：`false` */
  @Input() @InputBoolean() readonly: boolean = false;
  /** 选中后回调，参数：选中值 */
  @Output() readonly selected = new EventEmitter<number>();

  constructor(private DEF: RatingConfig, private cdr: ChangeDetectorRef) {}

  private setConfig(cog: RatingConfig): void {
    const _c: any = {
      states: [],
      ...this.DEF,
      ...cog,
    };
    this._class = _c.cls || '';
    const count = _c.states.length || _c.max;
    this._range = Array(count)
      .fill(0)
      .map((_v, i) => {
        return {
          index: i,
          on: _c.stateOn,
          off: _c.stateOff,
          title: _c.titles![i] || i + 1,
          ...(_c.states[i] || {}),
        };
      });
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.config) {
      this.setConfig(changes.config.currentValue);
    }
  }

  _rate(value: number): void {
    if (!this.readonly && value >= 0 && value <= this._range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
    this.cdr.detectChanges();
  }

  writeValue(_value: any): void {
    if (_value % 1 !== _value) {
      this._value = Math.round(_value);
      this._preValue = _value;
      this.cdr.detectChanges();
      return;
    }

    this._preValue = _value;
    this._value = _value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(_fn: () => {}): void {
    // this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
