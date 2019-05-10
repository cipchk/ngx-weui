import { Component, DebugElement } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { CellModule, SwipeDirective } from '../cell';

const WIDTH = 68;
const html = `
<div class="weui-cell weui-cell_swiped" weui-swipe [weui-width]="width">
    <div class="weui-cell__bd">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>标题文字</p>
            </div>
            <div class="weui-cell__ft">向左滑动试试</div>
        </div>
    </div>
    <div class="weui-cell__ft">
        <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:">删除</a>
    </div>
</div>
`;
const htmlNotBody = `
        <div class="weui-cell weui-cell_swiped" weui-swipe [weui-width]="width">
            <div class="weui-cell__ft">
                <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:">删除</a>
            </div>
        </div>
`;

function spyPageX(val: number) {
  return { touches: [{ pageX: val }] };
}

function open(directive: SwipeDirective, el: any, width: number, shouldOpen: boolean) {
  directive.onTouchStart(spyPageX(0));
  directive.onTouchMove(spyPageX(-width));
  fixture.detectChanges();
  expect(el.querySelector('.weui-cell__bd').style.transform).toBe(`translateX(-${width}px)`);
  directive.onTouchEnd(spyPageX(-width));
  fixture.detectChanges();
  expect(el.querySelector('.weui-cell__bd').style.transform).toBe(
    `translateX(${shouldOpen ? '-' + directive.width : '0'}px)`,
  );
}

let fixture: ComponentFixture<TestSwipeComponent>;
describe('Directive: Swipe', () => {
  let el: any;
  let directives: SwipeDirective[];

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestSwipeComponent],
      imports: [CellModule.forRoot(), FormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    TestBed.overrideComponent(TestSwipeComponent, {
      set: { template: html },
    });
    fixture = TestBed.createComponent(TestSwipeComponent);
    el = fixture.nativeElement;

    const list = fixture.debugElement.queryAll(By.directive(SwipeDirective));
    directives = list.map((de: DebugElement) => de.injector.get<SwipeDirective>(SwipeDirective));

    fixture.detectChanges();
    tick();
  }));

  it('should init', fakeAsync(() => {
    expect(directives.length).toBe(1);
    expect(el.querySelector('.weui-cell__bd').style.transform).toBe('translateX(0px)');
  }));

  for (const moveWidth of [10, WIDTH - 10]) {
    const hasOpened = moveWidth > 10;
    it(`should be ${hasOpened ? 'open' : 'close'} by 0px to ${moveWidth}px in closed`, () => {
      open(directives[0], el, moveWidth, hasOpened);
    });
  }

  for (const moveWidth of [WIDTH - 10, 10]) {
    const hasOpened = moveWidth !== 10;
    it(`should be ${hasOpened ? 'open' : 'close'} by ${WIDTH}px to ${moveWidth}px in opened`, () => {
      // 先强制打开状态
      open(directives[0], el, WIDTH - 10, true);

      directives[0].onTouchStart(spyPageX(-WIDTH));
      directives[0].onTouchMove(spyPageX(-moveWidth));
      directives[0].onTouchEnd(spyPageX(-moveWidth));
      fixture.detectChanges();
      expect(el.querySelector('.weui-cell__bd').style.transform).toBe(`translateX(${hasOpened ? '-' + WIDTH : '0'}px)`);
    });
  }

  it('should be raw status in zero move width', () => {
    directives[0].onTouchStart(spyPageX(0));
    directives[0].onTouchMove(spyPageX(0));
    directives[0].onTouchEnd(spyPageX(0));
    fixture.detectChanges();
    expect(el.querySelector('.weui-cell__bd').style.transform).toBe(`translateX(0px)`);
  });
});

describe('Directive: Swipe(not body)', () => {
  let directive: SwipeDirective[];

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestSwipeComponent],
      imports: [CellModule.forRoot(), FormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });
    TestBed.overrideComponent(TestSwipeComponent, {
      set: { template: htmlNotBody },
    });
    fixture = TestBed.createComponent(TestSwipeComponent);
    const list = fixture.debugElement.queryAll(By.directive(SwipeDirective));
    directive = list.map((de: DebugElement) => de.injector.get<SwipeDirective>(SwipeDirective));

    fixture.detectChanges();
    tick();
  }));

  it('should init', fakeAsync(() => {
    expect(directive.length).toBe(1);
    expect(directive[0].width).toBe(0);
  }));
});

@Component({
  selector: 'test-swipe',
  template: '',
})
class TestSwipeComponent {
  width: number = WIDTH;
}
