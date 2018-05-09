import { Subscriber } from 'rxjs';
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
  discardPeriodicTasks,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  SidebarModule,
  SidebarContainerComponent,
  SidebarComponent,
  CloseSidebarDirective,
} from '../sidebar';

describe('Component: Sidebar', () => {
  let fixture: ComponentFixture<TestSidebarComponent>;
  let context: TestSidebarComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSidebarComponent],
      imports: [SidebarModule.forRoot(), NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(TestSidebarComponent);
    context = fixture.componentInstance;
    spyOn(context, '_openStart');
    spyOn(context, '_opened');
    spyOn(context, '_closeStart');
    spyOn(context, '_closed');
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should default values', () => {
    const sidebarEl = el.querySelector('.weui-sidebar') as HTMLElement;
    const classs = sidebarEl.classList;
    expect(classs).toContain('weui-sidebar__closed');
    expect(classs).toContain('weui-sidebar__left');
    expect(classs).toContain('weui-sidebar__slide');
    expect(sidebarEl.style.transform).toBe('translateX(-100%)');
  });

  it('should set mode="over"', () => {
    context.mode = 'over';
    fixture.detectChanges();
    expect(el.querySelector('.weui-sidebar').classList).toContain(
      'weui-sidebar__over',
    );
  });

  for (const pos of ['left', 'right', 'top', 'bottom']) {
    it(`should set position="${pos}"`, () => {
      context.position = pos;
      fixture.detectChanges();
      expect(el.querySelector('.weui-sidebar').classList).toContain(
        `weui-sidebar__${pos}`,
      );
    });
  }

  it(
    'should set ariaLabel',
    fakeAsync(() => {
      const str: string = 'value';
      context.ariaLabel = str;
      fixture.detectChanges();
      tick(1000);
      expect(
        el.querySelector('.weui-sidebar').attributes['aria-label'].value,
      ).toBe(str);
    }),
  );

  it(
    'should be opened and status=true',
    fakeAsync(() => {
      context.status = true;
      fixture.detectChanges();
      tick(1000);
      expect(context.status).toBe(true);
    }),
  );

  it(
    'should be closed and status=false',
    fakeAsync(() => {
      context.status = true;
      fixture.detectChanges();
      tick(1000);
      context.sidebar.close();
      fixture.detectChanges();
      tick(1000);
      expect(context.sidebar.status).toBe(false);
    }),
  );

  it(
    'should emit opens event',
    fakeAsync(() => {
      context.status = true;
      fixture.detectChanges();
      tick(1000);
      expect(context._openStart).toHaveBeenCalled();
    }),
  );

  it(
    'should emit closes event',
    fakeAsync(() => {
      context.status = true;
      fixture.detectChanges();
      context.sidebar.close();
      fixture.detectChanges();
      tick(1000);
      expect(context._closeStart).toHaveBeenCalled();
    }),
  );

  it(
    'should close via directive',
    fakeAsync(() => {
      context.status = true;
      fixture.detectChanges();
      (el.querySelector('[closesidebar]') as HTMLDivElement).click();
      fixture.detectChanges();
      tick(1000);
      expect(context._closeStart).toHaveBeenCalled();
      expect(context.status).toBe(false);
    }),
  );

  it(
    'should closed via click mask',
    fakeAsync(() => {
      context._showBackdrop = true;
      context.status = true;
      fixture.detectChanges();
      (el.querySelector('.weui-mask') as HTMLElement).click();
      fixture.detectChanges();
      tick(1000);
      expect(context._closeStart).toHaveBeenCalled();
      expect(context.status).toBe(false);
    }),
  );
});

@Component({
  template: `
<weui-sidebar-container>
    <weui-sidebar #sidebar
        [(status)]="status"
        [mode]="mode"
        [position]="position"
        [backdrop]="backdrop"
        [sidebarClass]="sidebarClass"
        [ariaLabel]="ariaLabel"
        (openStart)="_openStart()"
        (opened)="_opened()"
        (closeStart)="_closeStart()"
        (closed)="_closed()">sidebar</weui-sidebar>
    <p>这是侧边栏内容</p>
    <div closeSidebar>使用指令[closeSidebar]关闭</div>
</weui-sidebar-container>
    `,
})
class TestSidebarComponent {
  @ViewChild('sidebar') sidebar: SidebarComponent;

  _showBackdrop = false;
  status: boolean = false;
  mode: string = 'slide';
  position: string = 'left';
  backdrop: boolean = true;
  sidebarClass: string = '';
  ariaLabel: string = '';

  _openStart() {}
  _opened() {}
  _closeStart() {}
  _closed() {}
}
