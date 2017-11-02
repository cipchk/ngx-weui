import { Subscriber } from 'rxjs/Subscriber';
import { Component, ViewChild, DebugElement, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SliderModule } from './slider.module';
import { SliderDirective } from './slider';

const MIN = 1, MAX = 100, STEP = 1, VALUE = 0, REALVALUE = 1;

describe('Component: Slider', () => {
    let fixture: ComponentFixture<TestSliderComponent>;
    let context: TestSliderComponent;
    let el: HTMLElement;
    let directive: SliderDirective;

    describe('[basic]', () => {

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestSliderComponent],
                imports: [SliderModule.forRoot(), FormsModule, NoopAnimationsModule]
            });
            fixture = TestBed.createComponent(TestSliderComponent);
            context = fixture.componentInstance;
            spyOn(context, '_change');
            el = fixture.nativeElement;

            const directives = fixture.debugElement.queryAll(By.directive(SliderDirective));
            directive = directives.map((de: DebugElement) => de.injector.get(SliderDirective) as SliderDirective)[0];

            fixture.detectChanges();

            tick();
        }));

        it('should be defined on the test component', () => {
            expect(directive).not.toBeNull();
        });


        it('should default values', () => {
            expect(directive.min).toBe(MIN);
            expect(directive.max).toBe(MAX);
            expect(directive.step).toBe(STEP);
            fixture.detectChanges();
            expect(context.val).toBe(VALUE);
        });

        it('should set value: 10', fakeAsync(() => {
            const val = 10;
            context.val = val;
            fixture.detectChanges();

            expect(el.querySelector('.weui-slider-box__value').textContent).toBe('' + val);
            tick(100);
            expect(context._change).toHaveBeenCalled();
        }));

        // 当赋值超出最大或最小值时，不做修饰
        // it('should exceed minimum return min value', () => {
        //     context.val = -VALUE;
        //     fixture.detectChanges();
        //     expect(context.val).toBe(MIN);
        // });

        // it('should exceed maximum return max value', () => {
        //     context.val = VALUE + 1000;
        //     fixture.detectChanges();
        //     expect(context.val).toBe(MAX);
        // });

    });

});

@Component({
    template: `
    <div class="weui-slider-box" [(ngModel)]="val" name="val"
        weui-slider [weui-min]="min" [weui-max]="max" [weui-step]="step"
        [weui-enabled]="enabled"
        (weui-change)="_change()">
        <div class="weui-slider">
            <div class="weui-slider__inner">
                <div class="weui-slider__track"></div>
                <div class="weui-slider__handler"></div>
            </div>
        </div>
        <div class="weui-slider-box__value">{{val}}</div>
    </div>
    `
})
class TestSliderComponent {

    val: number = VALUE;

    min: number = MIN;
    max: number = MAX;
    step: number = STEP;
    enabled: boolean = true;
    _change() { }
}
