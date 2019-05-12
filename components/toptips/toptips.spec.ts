import { Component, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ToptipsComponent, ToptipsModule, ToptipsService } from '../toptips';

describe('Component: Toptips', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestToptipsComponent>;
    let context: TestToptipsComponent;
    let el: HTMLElement;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestToptipsComponent],
        imports: [ToptipsModule, NoopAnimationsModule],
      });
      fixture = TestBed.createComponent(TestToptipsComponent);
      context = fixture.componentInstance;
      fixture.detectChanges();
      el = fixture.nativeElement;
      tick();
    }));

    it('should default values', () => {
      expect(el.querySelector('.weui-toptips')!.textContent!.trim()).toBe('content');
      expect(el.querySelector('.weui-toptips')!.classList).toContain('weui-toptips__success');
    });

    it('should be open by onShow()', () => {
      context.toptips.onShow();
      fixture.detectChanges();
      expect(el.querySelector('weui-toptips')!.attributes.getNamedItem('hidden')).toBeNull();
    });

    it('should hide', fakeAsync(() => {
      context.toptips.onShow();
      fixture.detectChanges();
      // 等待动画结束
      tick(200);
      fixture.detectChanges();
      expect(el.querySelector('weui-toptips')!.attributes.getNamedItem('hidden')).not.toBeNull();
      tick();
    }));
  });

  describe('[service]', () => {
    let service: ToptipsService;
    let fixture: any;
    let el: any;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [ToptipsModule, FormsModule, NoopAnimationsModule],
        declarations: [TestToptipsServiceComponent],
        providers: [ToptipsService],
      }).createComponent(TestToptipsServiceComponent);

      fixture = TestBed.createComponent(TestToptipsServiceComponent);
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick();
    }));

    beforeEach(inject([ToptipsService], (_s: ToptipsService) => {
      service = _s;
    }));

    it('should show success toptips', fakeAsync(() => {
      service.success('success', 100);
      fixture.detectChanges();
      // 等待动画结束
      tick(200);
      fixture.detectChanges();
      expect(el.parentElement.querySelector('weui-toptips')).toBeNull();
    }));
  });
});

@Component({
  template: `
    <h1>Test Service</h1>
  `,
})
class TestToptipsServiceComponent {}

@Component({
  selector: 'test-component',
  template: `
    <weui-toptips [type]="type" [time]="100" [text]="text"></weui-toptips>
  `,
})
class TestToptipsComponent {
  @ViewChild(ToptipsComponent) toptips: ToptipsComponent;

  type: string = 'success';
  text: string = 'content';
}
