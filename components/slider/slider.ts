import {
  Directive,
  forwardRef,
  ElementRef,
  OnDestroy,
  HostListener,
  ContentChild,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 滑块指令，支持[(ngModel)]
 */
@Directive({
  selector: '[weui-slider]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderDirective),
      multi: true,
    },
  ],
})
export class SliderDirective
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  private _state: any = null;

  private _value: number = 0;

  private isInit: boolean = false;
  private trackEl: any;
  private handlerEl: any;
  onTouchStart: any;
  onTouchMove: any;

  /**
   * 允许的最小值，默认：`0`
   */
  @Input('weui-min') min: number = 0;

  /**
   * 允许的最大值，默认：`100`
   */
  @Input('weui-max') max: number = 100;

  /**
   * 步长，默认：`1`
   */
  @Input('weui-step') step: number = 1;

  /**
   * 是否可用
   */
  @Input('weui-enabled') enabled: boolean = true;
  /**
   * 值改变时触发
   */
  @Output('weui-change') change = new EventEmitter<number>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.isInit = true;
    this.trackEl = this.el.nativeElement.querySelector('.weui-slider__track');
    this.handlerEl = this.el.nativeElement.querySelector(
      '.weui-slider__handler',
    );
    if (this.trackEl === null || this.handlerEl === null)
      throw new Error('失效DOM结构');

    this.onTouchStart = this.startHandle.bind(this);
    this.onTouchMove = this.moveHandle.bind(this);
    this.handlerEl.addEventListener('touchstart', this.onTouchStart, false);
    this.handlerEl.addEventListener('touchmove', this.onTouchMove, false);
  }

  ngOnDestroy(): void {
    this.handlerEl.removeEventListener('touchstart', this.onTouchStart, false);
    this.handlerEl.removeEventListener('touchmove', this.onTouchMove, false);
  }

  private refresh() {
    const el = this.el.nativeElement;
    this._state = {
      enabled: this.enabled,
      left: el.getBoundingClientRect().left,
      size: el.querySelector('.weui-slider__inner').offsetWidth,
      percentage: [0, 0, 0],
      x: 0,
    };
    this.max = +this.max;
    this.min = +this.min;
    this.step = +this.step;

    this.setValue(this._value);
    this.layout();
  }

  private setValue(value: number) {
    if (this.max > this.min) {
      this._state.percentage = [
        100 * (value - this.min) / (this.max - this.min),
        0,
        this.step * 100 / (this.max - this.min),
      ];
    } else {
      this._state.percentage = [0, 0, 100];
    }
  }

  private layout() {
    this.trackEl.style.width = this._state.percentage[0] + '%';
    this.handlerEl.style.left = this._state.percentage[0] + '%';
  }

  private startHandle($event: any) {
    if (this._state === null) this.refresh();

    this._state.x = ($event.touches[0] || $event.changedTouches[0]).pageX;
  }

  private moveHandle($event: any) {
    if (!this._state.enabled) return false;

    const pageX = ($event.touches[0] || $event.changedTouches[0]).pageX;

    const xDiff = pageX - this._state.x;
    if (xDiff >= 15 || xDiff <= 15) {
      this._state.percentage[0] = this.getPercentage(pageX, $event);
      this.layout();
      this.calculateValue(this._state.percentage[0]);
    }
  }

  private getPercentage(pageX: number, $event: any): number {
    const distanceToSlide = pageX - this._state.left;
    let percentage = distanceToSlide / this._state.size * 100;
    percentage =
      Math.round(percentage / this._state.percentage[2]) *
      this._state.percentage[2];
    return Math.max(0, Math.min(100, percentage));
  }

  private calculateValue(percentage: number) {
    const rawValue = percentage / 100 * (this.max - this.min);
    // adjustment = this.min
    let value = this.min + Math.round(rawValue / this.step) * this.step;
    if (value < this.min) value = this.min;
    else if (value > this.max) value = this.max;

    this._value = value;
    this.onChange(this._value);
    this.onTouched();
    this.change.emit(this._value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInit) this.refresh();
  }

  writeValue(value: any): void {
    if (value) {
      this._value = +value;
      this.refresh();
      this.calculateValue(this._state.percentage[0]);
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
    this.enabled = !isDisabled;
  }
}
