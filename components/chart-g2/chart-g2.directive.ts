import {
  Directive,
  OnInit,
  OnDestroy,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  NgZone,
} from '@angular/core';

declare const GM: any;

@Directive({ selector: 'canvas[weui-chart-g2]', exportAs: 'chart-g2' })
export class ChartG2Directive implements OnInit, OnDestroy, OnChanges {
  _chart: any;

  /**
   * chart实例对象
   */
  get chart(): any {
    return this._chart;
  }

  /**
   * GM对象
   */
  get GM(): any {
    return GM;
  }

  /**
   * 画布内部的边距，可以是数组 [top, right, bottom, left] 也可以是一个数字。
   */
  @Input() margin: number[] | number;

  private initFlag: boolean = false;
  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    this.initFlag = true;
    this.buildChart();
  }

  private buildChart() {
    const object: any = {
      el: this.el.nativeElement,
    };
    if (this.margin) object.margin = this.margin;

    this.zone.runOutsideAngular(() => {
      this._chart = new GM.Chart(object);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initFlag) {
      if ('margin' in changes && !changes['margin'].firstChange) {
        this.buildChart();
      }
    }
  }

  ngOnDestroy(): void {
    if (this._chart) {
      this.zone.runOutsideAngular(() => {
        // fixed: TypeError: Cannot read property 'stop' of null
        try {
          this._chart.destroy();
        } catch (e) {
          console.warn(e);
        }
      });
    }
  }
}
