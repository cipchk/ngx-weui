import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Stepper 步进器，支持 `[(ngModel)]`
 */
@Component({
  selector: 'weui-stepper',
  template: `
  <span class="minus" [ngClass]="{'disabled':_disabledMinus}" (click)="_minus()"><em>-</em></span>
  <div class="input">
    <input type="tel" #inputNumber [(ngModel)]="value" (blur)="_blur()"
      [disabled]="disabled"
      [attr.min]="min"
      [attr.max]="max"
      [attr.step]="_step"
      autocomplete="off">
  </div>
  <span class="plus" [ngClass]="{'disabled':_disabledPlus}" (click)="_plus()"><em>+</em></span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true,
    },
  ],
})
export class StepperComponent implements ControlValueAccessor {
  /** 最小值 */
  @Input() min: number = -Infinity;
  /** 最大值 */
  @Input() max: number = Infinity;
  /** 禁用 */
  @Input()
  @HostBinding('class.disabled')
  disabled: boolean = false;
  /** 变更时回调 */
  @Output() change = new EventEmitter<number>();

  _step: number = 1;
  _precisionStep = 0;
  _precisionFactor = 1;

  @ViewChild('inputNumber') _inputNumber: ElementRef;

  /** 步长，可以为小数 */
  @Input()
  get step() {
    return this._step;
  }
  set step(value: number) {
    this._step = value;

    const stepString = value.toString();
    if (stepString.indexOf('e-') >= 0) {
      this._precisionStep = parseInt(
        stepString.slice(stepString.indexOf('e-')),
        10,
      );
    }
    if (stepString.indexOf('.') >= 0) {
      this._precisionStep = stepString.length - stepString.indexOf('.') - 1;
    }
    this._precisionFactor = Math.pow(10, this._precisionStep);
  }

  private _value: number;

  get value() {
    return this._value;
  }
  set value(value: number) {
    if (isNaN(value) || value === this.value) return;

    value = +value;

    if (value > this.max) {
      this._value = this.max;
      this.onChange(this.max);
    } else if (value < this.min) {
      this._value = this.min;
      this.onChange(this.min);
    } else {
      this._value = value;
      this._checkDisabled();
    }
  }

  _disabledMinus: boolean = false;
  _disabledPlus: boolean = false;
  _checkDisabled(): this {
    this._disabledPlus = this.disabled || !(this.value + this.step <= this.max);
    this._disabledMinus =
      this.disabled || !(this.value - this.step >= this.min);
    return this;
  }

  _notify() {
    this.change.emit(this.value);
    this.onChange(this.value);
  }

  _plus() {
    if (this.value === undefined) this.value = this.max || 0;
    this._checkDisabled();

    if (this._disabledPlus) return;
    this.value = this._toPrecisionAsStep(
      (this._precisionFactor * this.value + this._precisionFactor * this.step) /
      this._precisionFactor,
    );
    this._checkDisabled()._notify();
  }

  _minus() {
    if (this.value === undefined) this.value = this.min || 0;
    this._checkDisabled();

    if (this._disabledMinus) return;
    this.value = this._toPrecisionAsStep(
      (this._precisionFactor * this.value - this._precisionFactor * this.step) /
      this._precisionFactor,
    );
    this._checkDisabled()._notify();
  }

  _blur() {
    const el = this._inputNumber.nativeElement;
    this.value = +el.value;
    el.value = this.value;
    this._checkDisabled()._notify();
  }

  _toPrecisionAsStep(num: any) {
    if (isNaN(num) || num === '') {
      return num;
    }
    return Number(Number(num).toFixed(this._precisionStep));
  }

  writeValue(value: any): void {
    this.value = value;
    this._checkDisabled();
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
