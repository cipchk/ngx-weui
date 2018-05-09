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

import {
  ToastModule,
  ToastComponent,
  ToastConfig,
  ToastService,
} from '../toast';

describe('Component: Toast', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let context: TestToastComponent;
    let dl: DebugElement;
    let el: HTMLElement;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestToastComponent],
          imports: [ToastModule.forRoot(), NoopAnimationsModule],
        });
        fixture = TestBed.createComponent(TestToastComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    it('should default values', () => {
      expect(el.querySelector('.weui-toast__content').textContent).toBe(
        '已完成',
      );
      expect(el.querySelector('.weui-icon_toast').classList).toContain(
        'weui-icon-success-no-circle',
      );
    });

    it('should be open by onShow()', () => {
      context.toast.onShow();
      fixture.detectChanges();
      expect(
        el.querySelector('weui-toast').attributes['hidden'],
      ).toBeUndefined();
    });

    it(
      'should hide',
      fakeAsync(() => {
        context.toast.onShow();
        fixture.detectChanges();
        // 等待动画结束
        tick(200);
        fixture.detectChanges();
        expect(
          el.querySelector('weui-toast').attributes['hidden'],
        ).not.toBeUndefined();
        tick();
      }),
    );
  });

  describe('[service]', () => {
    let service: ToastService;
    let fixture: any;
    let context: TestToastServiceComponent;
    let dl: DebugElement;
    let el: any;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          imports: [ToastModule.forRoot(), FormsModule, NoopAnimationsModule],
          declarations: [TestToastServiceComponent],
          providers: [ToastService],
        }).createComponent(TestToastServiceComponent);

        fixture = TestBed.createComponent(TestToastServiceComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    beforeEach(
      inject([ToastService], (_s: ToastService) => {
        service = _s;
      }),
    );

    it(
      'should show success toast',
      fakeAsync(() => {
        service.show('success', 100);
        fixture.detectChanges();
        // 等待动画结束
        tick(500);
        fixture.detectChanges();
        expect(el.parentElement.querySelector('weui-toast')).toBeNull();
      }),
    );
  });
});

@Component({
  template: `<h1>Test Service</h1>`,
})
class TestToastServiceComponent {}

@Component({
  selector: 'test-component',
  template: `
    <weui-toast [type]="type" [time]="100"></weui-toast>
    `,
})
class TestToastComponent {
  @ViewChild(ToastComponent) toast: ToastComponent;

  type: string = 'success';
}
