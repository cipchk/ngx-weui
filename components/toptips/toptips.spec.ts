import { Subscriber } from 'rxjs';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  ComponentFixtureAutoDetect,
  async,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ToptipsModule, ToptipsComponent, ToptipsService } from '../toptips';

describe('Component: Toptips', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestToptipsComponent>;
    let context: TestToptipsComponent;
    let el: HTMLElement;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestToptipsComponent],
          imports: [ToptipsModule.forRoot(), NoopAnimationsModule],
        });
        fixture = TestBed.createComponent(TestToptipsComponent);
        context = fixture.componentInstance;
        fixture.detectChanges();
        el = fixture.nativeElement;
        tick();
      }),
    );

    it('should default values', () => {
      expect(el.querySelector('.weui-toptips').textContent).toBe('content');
      expect(el.querySelector('.weui-toptips').classList).toContain(
        'weui-toptips_success',
      );
    });

    it('should be open by onShow()', () => {
      context.toptips.onShow();
      fixture.detectChanges();
      expect(
        el.querySelector('weui-toptips').attributes['hidden'],
      ).toBeUndefined();
    });

    it(
      'should hide',
      fakeAsync(() => {
        context.toptips.onShow();
        fixture.detectChanges();
        // 等待动画结束
        tick(200);
        fixture.detectChanges();
        expect(
          el.querySelector('weui-toptips').attributes['hidden'],
        ).not.toBeUndefined();
        tick();
      }),
    );
  });

  describe('[service]', () => {
    let service: ToptipsService;
    let fixture: any;
    let context: TestToptipsServiceComponent;
    let dl: DebugElement;
    let el: any;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          imports: [ToptipsModule.forRoot(), FormsModule, NoopAnimationsModule],
          declarations: [TestToptipsServiceComponent],
          providers: [ToptipsService],
        }).createComponent(TestToptipsServiceComponent);

        fixture = TestBed.createComponent(TestToptipsServiceComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    beforeEach(
      inject([ToptipsService], (_s: ToptipsService) => {
        service = _s;
      }),
    );

    it(
      'should show success toptips',
      fakeAsync(() => {
        service.success('success', 100);
        fixture.detectChanges();
        // 等待动画结束
        tick(200);
        fixture.detectChanges();
        expect(el.parentElement.querySelector('weui-toptips')).toBeNull();
      }),
    );
  });
});

@Component({
  template: `<h1>Test Service</h1>`,
})
class TestToptipsServiceComponent {}

@Component({
  selector: 'test-component',
  template: `<weui-toptips [type]="type" [time]="100" [text]="text"></weui-toptips>`,
})
class TestToptipsComponent {
  @ViewChild(ToptipsComponent) toptips: ToptipsComponent;

  type: string = 'success';
  text: string = 'content';
}
