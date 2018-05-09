import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  async,
  inject,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';

import { PTRModule, PTRComponent, PTRConfig } from '../ptr';

function spyTouchArgument(val: number) {
  return {
    targetTouches: [{ pageY: val, identifier: 1 }],
    preventDefault: function() {},
  };
}

describe('Component: PTR', () => {
  let fixture: ComponentFixture<TestPTRComponent>;
  let context: TestPTRComponent;
  let el: HTMLDivElement;
  let comp: PTRComponent;

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestPTRComponent],
        imports: [PTRModule.forRoot(), NoopAnimationsModule],
      });
      fixture = TestBed.createComponent(TestPTRComponent);
      context = fixture.componentInstance;
      spyOn(context, 'onScroll');
      spyOn(context, 'onRefresh');
      fixture.detectChanges();
      el = fixture.nativeElement;
      comp = fixture.debugElement.query(By.css('weui-ptr'))
        .componentInstance as PTRComponent;
      tick();
    }),
  );

  it('should correctly initialize and attach to DOM', () => {
    expect(el.querySelector('.weui-ptr__loader')).not.toBeNull();
    expect(el.querySelector('.weui-ptr__content')).not.toBeNull();
    expect(el.querySelectorAll('.weui-cell_access').length).toBe(
      context.items.length,
    );
  });

  it('should be set last updated labled', () => {
    const labelText = 'test';
    comp.setLastUpdatedLabel(labelText);
    fixture.detectChanges();
    expect(el.querySelector('.weui-ptr__label').textContent).toBe(labelText);
  });

  it(
    'should be set finished',
    fakeAsync(() => {
      const labelText = 'test';
      comp.setFinished(labelText);
      fixture.detectChanges();
      tick(500);
      expect(comp._animating).toBe(false);
      fixture.detectChanges();
      expect(el.querySelector('.weui-ptr__label').textContent).toBe(labelText);
    }),
  );

  it('should be re-setting config', () => {
    expect(comp.config.height).toBe(100);
    context.config = { height: 110 };
    fixture.detectChanges();
    expect(comp.config.height).toBe(110);
  });

  it('should be open', () => {
    comp.onTouchStart(spyTouchArgument(0));
    comp.onTouchMove(spyTouchArgument(80));
    fixture.detectChanges();
    comp.onTouchEnd(spyTouchArgument(80));
    fixture.detectChanges();
    expect(context.onScroll).toHaveBeenCalled();
    expect(context.onRefresh).toHaveBeenCalled();
  });

  it('should be no-allow open in less than treshold', () => {
    comp.onTouchStart(spyTouchArgument(0));
    comp.onTouchMove(spyTouchArgument(50));
    fixture.detectChanges();
    comp.onTouchEnd(spyTouchArgument(50));
    fixture.detectChanges();
    expect(context.onScroll).toHaveBeenCalled();
    expect(context.onRefresh).not.toHaveBeenCalled();
  });
});

@Component({
  template: `
<weui-ptr (scroll)="onScroll($event)" [config]="config" (refresh)="onRefresh($event)" style="height: 200px; background: rgb(255, 255, 255);">
    <div class="weui-cells__title">List with link</div>
    <div class="weui-cells">
        <a *ngFor="let i of items" class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">{{i}}</div>
            <div class="weui-cell__ft"></div>
        </a>
    </div>
</weui-ptr>
`,
})
class TestPTRComponent {
  config: PTRConfig = {
    height: 100,
  };

  items: any[] = Array(6)
    .fill({})
    .map((v: any, idx: number) => {
      return `${idx}:${Math.random()}`;
    });
  onRefresh(ptr: PTRComponent) {
    return ptr;
  }
  onScroll(percent: number) {
    return percent;
  }
}
