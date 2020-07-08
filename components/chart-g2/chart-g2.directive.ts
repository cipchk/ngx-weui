import { Directive, ElementRef, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { NwSafeAny } from 'ngx-weui/core';

declare const GM: NwSafeAny;

@Directive({ selector: 'canvas[weui-chart-g2]', exportAs: 'weuiChartG2' })
export class ChartG2Directive implements OnInit, OnDestroy, OnChanges {
  _chart: NwSafeAny;

  /**
   * 画布内部的边距，可以是数组 [top, right, bottom, left] 也可以是一个数字。
   */
  @Input() margin: number[] | number;

  private initFlag: boolean = false;

  /**
   * chart实例对象
   */
  get chart(): NwSafeAny {
    return this._chart;
  }

  /**
   * GM对象
   */
  get GM(): NwSafeAny {
    return GM;
  }
  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.initFlag = true;
    this.buildChart();
  }

  private buildChart(): void {
    const options: {
      el: HTMLElement;
      margin?: number | number[];
    } = {
      el: this.el.nativeElement,
    };
    if (this.margin) {
      options.margin = this.margin;
    }

    this.zone.runOutsideAngular(() => {
      this._chart = new GM.Chart(options);
    });
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (this.initFlag && changes.margin && !changes.margin.firstChange) {
      this.buildChart();
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
