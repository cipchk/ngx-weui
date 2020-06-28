import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean, InputNumber } from 'ngx-weui/core';

@Component({
  selector: 'weui-slider, [weui-slider]',
  exportAs: 'weuiSlider',
  templateUrl: './slider.component.html',
  host: {
    '[class.weui-slider-box]': 'showValue',
    '[class.weui-slider]': '!showValue',
    '[class.weui-slider__disabled]': '!enabled',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnChanges {
  private el: HTMLElement;
  private state: any = null;
  private isInit: boolean = false;
  private trackEl: HTMLElement;
  private handlerEl: HTMLElement;
  private onChange: (val: number) => void;
  private onTouched: () => void;
  private onTouchStart: any;
  private onTouchMove: any;

  value: number = 0;

  /**
   * 允许的最小值，默认：`0`
   */
  @Input('weui-min') @InputNumber() min: number = 0;

  /**
   * 允许的最大值，默认：`100`
   */
  @Input('weui-max') @InputNumber() max: number = 100;

  /**
   * 步长，默认：`1`
   */
  @Input('weui-step') @InputNumber() step: number = 1;

  /**
   * 是否可用
   */
  @Input('weui-enabled') @InputBoolean() enabled: boolean = true;

  @Input('weui-show-value') @InputBoolean() showValue: boolean = true;
  /**
   * 值改变时触发
   */
  // tslint:disable-next-line: no-output-rename
  @Output('weui-change') readonly change = new EventEmitter<number>();

  constructor(el: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    this.trackEl = this.el.querySelector('.weui-slider__track')! as HTMLElement;
    this.handlerEl = this.el.querySelector('.weui-slider__handler')! as HTMLElement;

    this.onTouchStart = this.startHandle.bind(this);
    this.onTouchMove = this.moveHandle.bind(this);
    this.handlerEl.addEventListener('touchstart', this.onTouchStart, false);
    this.handlerEl.addEventListener('touchmove', this.onTouchMove, false);
  }

  ngOnDestroy(): void {
    this.handlerEl.removeEventListener('touchstart', this.onTouchStart, false);
    this.handlerEl.removeEventListener('touchmove', this.onTouchMove, false);
  }

  private refresh(): void {
    this.state = {
      enabled: this.enabled,
      left: this.el.getBoundingClientRect().left,
      size: (this.el.querySelector('.weui-slider__inner')! as HTMLElement).offsetWidth!,
      percentage: [0, 0, 0],
      x: 0,
    };
    this.max = +this.max;
    this.min = +this.min;
    this.step = +this.step;

    this.setValue(this.value);
    this.layout();
  }

  private setValue(value: number): void {
    if (this.max > this.min) {
      this.state.percentage = [
        // tslint:disable-next-line: binary-expression-operand-order
        (100 * (value - this.min)) / (this.max - this.min),
        0,
        (this.step * 100) / (this.max - this.min),
      ];
    } else {
      this.state.percentage = [0, 0, 100];
    }
  }

  private layout(): void {
    this.trackEl.style.width = this.state.percentage[0] + '%';
    this.handlerEl.style.left = this.state.percentage[0] + '%';
  }

  private startHandle($event: TouchEvent): void {
    if (this.state === null) {
      this.refresh();
    }

    this.state.x = ($event.touches[0] || $event.changedTouches[0]).pageX;
  }

  private moveHandle($event: TouchEvent): void {
    if (!this.state.enabled) {
      return;
    }

    const pageX = ($event.touches[0] || $event.changedTouches[0]).pageX;

    const xDiff = pageX - this.state.x;
    if (xDiff >= 15 || xDiff <= 15) {
      this.state.percentage[0] = this.getPercentage(pageX);
      this.layout();
      this.calculateValue(this.state.percentage[0]);
    }
  }

  private getPercentage(pageX: number): number {
    const distanceToSlide = pageX - this.state.left;
    let percentage = (distanceToSlide / this.state.size) * 100;
    percentage = Math.round(percentage / this.state.percentage[2]) * this.state.percentage[2];
    return Math.max(0, Math.min(100, percentage));
  }

  private calculateValue(percentage: number): void {
    const rawValue = (percentage / 100) * (this.max - this.min);
    // adjustment = this.min
    let value = this.min + Math.round(rawValue / this.step) * this.step;
    if (value < this.min) {
      value = this.min;
    } else if (value > this.max) {
      value = this.max;
    }

    this.value = value;
    this.onChange(this.value);
    this.onTouched();
    this.change.emit(this.value);
  }

  ngOnChanges(): void {
    if (this.isInit) {
      this.refresh();
    }
  }

  writeValue(value: number): void {
    if (value) {
      this.value = +value;
      this.refresh();
      this.calculateValue(this.state.percentage[0]);
    }
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.enabled = !isDisabled;
  }
}
