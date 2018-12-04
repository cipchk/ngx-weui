import { Component, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ChartG2Module, ChartG2Directive } from '../chart-g2';

describe('Component: ChartG2', () => {
  let fixture: ComponentFixture<TestChartG2Component>;
  let context: TestChartG2Component;
  let el: HTMLElement;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestChartG2Component],
        imports: [ChartG2Module.forRoot(), NoopAnimationsModule],
      });
      fixture = TestBed.createComponent(TestChartG2Component);
      context = fixture.componentInstance;
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }),
  );

  it('should be inited', () => {
    expect(context.c1.chart).not.toBeNull();
    expect(context.c1.GM).not.toBeNull();
  });

  it('should be change [margin]', () => {
    const MARGIN = 10;
    context.margin = MARGIN;
    fixture.detectChanges();
    expect(context.c1.margin).toBe(MARGIN);
  });
});

@Component({
  template: `<canvas weui-chart-g2 [margin]="margin" #c1="chart-g2" style="width:100%;height:200px;"></canvas>`,
})
class TestChartG2Component {
  margin = 0;

  @ViewChild('c1') c1: ChartG2Directive;
}
