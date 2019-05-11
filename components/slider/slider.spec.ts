import { Component, DebugElement } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SliderDirective } from './slider.directive';
import { SliderModule } from './slider.module';

const CONTAINER_WIDTH = 500;
const MIN = 1;
const MAX = 100;
const STEP = 1;
const VALUE = 0;

function spyTouchArgument(val: number) {
  return {
    touches: [{ pageX: val, identifier: 1 }],
    targetTouches: [{ pageX: val, identifier: 1 }],
    preventDefault() {},
  };
}

const html = `
<div style="width: ${CONTAINER_WIDTH}px; height: 100px; display: block; overflow: hidden;" [(ngModel)]="val" name="val"
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
</div>`;
const htmlInValid = `<div class="weui-slider-box" [(ngModel)]="val" name="val"
weui-slider [weui-min]="min" [weui-max]="max" [weui-step]="step"
[weui-enabled]="enabled"
(weui-change)="_change()"></div>`;

describe('Component: Slider', () => {
  let fixture: ComponentFixture<TestSliderComponent>;
  let context: TestSliderComponent;
  let el: HTMLElement;
  let directive: SliderDirective;

  describe('[default]', () => {
    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestSliderComponent],
        imports: [SliderModule, FormsModule, NoopAnimationsModule],
      });
      TestBed.overrideComponent(TestSliderComponent, {
        set: { template: html },
      });
      fixture = TestBed.createComponent(TestSliderComponent);
      context = fixture.componentInstance;
      spyOn(context, '_change');
      el = fixture.nativeElement;

      const directives = fixture.debugElement.queryAll(By.directive(SliderDirective));
      directive = directives.map((de: DebugElement) => de.injector.get<SliderDirective>(SliderDirective))[0];

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
      tick(10);

      expect(el.querySelector('.weui-slider-box__value')!.textContent).toBe('' + val);
      expect(context._change).toHaveBeenCalled();
    }));

    it('should exceed minimum return min value', fakeAsync(() => {
      context.val = -10;
      fixture.detectChanges();
      tick(10);

      expect(context.val).toBe(MIN);
      expect(context._change).toHaveBeenCalled();
    }));

    it('should exceed maximum return max value', fakeAsync(() => {
      context.val = 110;
      fixture.detectChanges();
      tick(10);

      expect(context.val).toBe(MAX);
      expect(context._change).toHaveBeenCalled();
    }));

    it('should be new value via touch', fakeAsync(() => {
      const moveSize = 1;
      const result = Math.ceil((moveSize / CONTAINER_WIDTH) * 100);
      directive.onTouchStart(spyTouchArgument(0));
      directive.onTouchMove(spyTouchArgument(moveSize));
      fixture.detectChanges();
      tick(10);
      expect(context.val).toBe(result);
      expect(context._change).toHaveBeenCalled();
    }));
  });

  it('should be throw error if invalid html', fakeAsync(() => {
    expect(() => {
      TestBed.configureTestingModule({
        declarations: [TestSliderComponent],
        imports: [SliderModule, FormsModule, NoopAnimationsModule],
      });
      TestBed.overrideComponent(TestSliderComponent, {
        set: { template: htmlInValid },
      });
      TestBed.createComponent(TestSliderComponent).detectChanges();
    }).toThrowError();
  }));
});

@Component({ template: `` })
class TestSliderComponent {
  val: number = VALUE;

  min: number = MIN;
  max: number = MAX;
  step: number = STEP;
  enabled: boolean = true;
  _change() {}
}
