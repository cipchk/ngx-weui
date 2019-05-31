import { Component, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToastComponent, ToastModule, ToastService } from '../toast';

describe('Component: Toast', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestToastComponent>;
    let context: TestToastComponent;
    let el: HTMLElement;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestToastComponent],
        imports: [ToastModule, NoopAnimationsModule],
      });
      fixture = TestBed.createComponent(TestToastComponent);
      context = fixture.componentInstance;
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }));

    it('should default values', () => {
      expect(el.querySelector('.weui-toast__content')!.textContent).toBe('已完成');
      expect(el.querySelector('.weui-icon_toast')!.classList).toContain('weui-icon-success-no-circle');
    });

    it('should be open by onShow()', () => {
      context.toast.onShow();
      fixture.detectChanges();
      expect(el.querySelector('weui-toast')!.attributes.getNamedItem('hidden')).toBeNull();
    });

    it('should hide', fakeAsync(() => {
      context.toast.onShow();
      fixture.detectChanges();
      // 等待动画结束
      tick(200);
      fixture.detectChanges();
      expect(el.querySelector('weui-toast')!.attributes.getNamedItem('hidden')).not.toBeNull();
      tick();
    }));
  });

  describe('[service]', () => {
    let service: ToastService;
    let fixture: any;
    let el: any;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [ToastModule, FormsModule, NoopAnimationsModule],
        declarations: [TestToastServiceComponent],
        providers: [ToastService],
      }).createComponent(TestToastServiceComponent);

      fixture = TestBed.createComponent(TestToastServiceComponent);
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }));

    beforeEach(inject([ToastService], (_s: ToastService) => {
      service = _s;
    }));

    it('should show success toast', fakeAsync(() => {
      service.show('success', 100);
      fixture.detectChanges();
      // 等待动画结束
      tick(500);
      fixture.detectChanges();
      expect(el.parentElement.querySelector('weui-toast')).toBeNull();
    }));
  });
});

@Component({
  template: `
    <h1>Test Service</h1>
  `,
})
class TestToastServiceComponent {}

@Component({
  selector: 'app-component',
  template: `
    <weui-toast [type]="type" [time]="100"></weui-toast>
  `,
})
class TestToastComponent {
  @ViewChild(ToastComponent, { static: true }) toast: ToastComponent;

  type: string = 'success';
}
