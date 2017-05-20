import { Subscriber } from 'rxjs/Rx';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChartG2Module, ChartG2Directive } from '../chart-g2';

describe('Component: ChartG2', () => {
    let fixture: ComponentFixture<TestChartG2Component>;
    let context: TestChartG2Component;
    let el: HTMLElement;

    describe('[basic]', () => {

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestChartG2Component],
                imports: [ChartG2Module.forRoot(), NoopAnimationsModule]
            });
            fixture = TestBed.createComponent(TestChartG2Component);
            context = fixture.componentInstance;
            el = fixture.nativeElement;
            fixture.detectChanges();
            tick();
        }));

        it('should be inited', () => {
            expect(context.c1.chart).not.toBeNull();
        });

    });

});

@Component({ template: `<canvas weui-chart-g2 #c1="chart-g2" style="width:100%;height:200px;"></canvas>` })
class TestChartG2Component {

    @ViewChild('c1') c1: ChartG2Directive;
}
