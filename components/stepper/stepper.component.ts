import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean, InputNumber } from 'ngx-weui/core';

/**
 * Stepper 步进器，支持 `[(ngModel)]`
 */
@Component({
  selector: 'weui-stepper',
  exportAs: 'weuiStepper',
  templateUrl: './stepper.component.html',
  host: {
    '[class.disabled]': 'disabled',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent implements ControlValueAccessor {
  private _value: number;
  private onChange: any = Function.prototype;
  // private onTouched: any = Function.prototype;
  _step = 1;
  _precisionStep = 0;
  _precisionFactor = 1;
  _disabledMinus = false;
  _disabledPlus = false;
  /** 最小值 */
  @Input() @InputNumber() min = -Infinity;
  /** 最大值 */
  @Input() @InputNumber() max = Infinity;
  /** 禁用 */
  @Input() @InputBoolean() disabled = false;
  /** 变更时回调 */
  @Output() readonly change = new EventEmitter<number>();

  @ViewChild('inputNumber', { static: true }) private _inputNumber: ElementRef<HTMLInputElement>;

  /** 步长，可以为小数 */
  @Input()
  @InputNumber()
  get step(): number {
    return this._step;
  }
  set step(value: number) {
    this._step = value;

    const stepString = value.toString();
    if (stepString.indexOf('e-') >= 0) {
      this._precisionStep = parseInt(stepString.slice(stepString.indexOf('e-')), 10);
    }
    if (stepString.indexOf('.') >= 0) {
      this._precisionStep = stepString.length - stepString.indexOf('.') - 1;
    }
    this._precisionFactor = Math.pow(10, this._precisionStep);
  }

  get value(): number {
    return this._value;
  }
  set value(value: number) {
    if (isNaN(value) || value === this.value) {
      return;
    }

    value = +value;

    if (value > this.max) {
      this._value = this.max;
      this.onChange(this.max);
    } else if (value < this.min) {
      this._value = this.min;
      this.onChange(this.min);
    } else {
      this._value = value;
    }
    this._checkDisabled();
    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef) {}

  _checkDisabled(): this {
    this._disabledPlus = this.disabled || !(this.value + this.step <= this.max);
    this._disabledMinus = this.disabled || !(this.value - this.step >= this.min);
    return this;
  }

  _notify(): void {
    this.change.emit(this.value);
    this.onChange(this.value);
  }

  _plus(): void {
    if (this.value === undefined) {
      this.value = this.max || 0;
    }
    this._checkDisabled();

    if (this._disabledPlus) {
      return;
    }
    this.value = this._toPrecisionAsStep((this._precisionFactor * this.value + this._precisionFactor * this.step) / this._precisionFactor);
    this._checkDisabled()._notify();
  }

  _minus(): void {
    if (this.value === undefined) {
      this.value = this.min || 0;
    }
    this._checkDisabled();

    if (this._disabledMinus) {
      return;
    }
    this.value = this._toPrecisionAsStep((this._precisionFactor * this.value - this._precisionFactor * this.step) / this._precisionFactor);
    this._checkDisabled()._notify();
  }

  _blur(): void {
    const el = this._inputNumber.nativeElement;
    this.value = +el.value;
    el.value = this.value.toString();
    this._checkDisabled()._notify();
  }

  _toPrecisionAsStep(num: any): number {
    if (isNaN(num) || num === '') {
      return num;
    }
    return Number(Number(num).toFixed(this._precisionStep));
  }

  writeValue(value: any): void {
    this.value = value;
    this._checkDisabled();
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(_fn: () => {}): void {
    // this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
