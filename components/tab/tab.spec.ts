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
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  TabModule,
  NavbarComponent,
  TabbarComponent,
  TabDirective,
} from '../tab';

const TABS: any[] = [
  {
    heading: 'tab1',
    content: 'tab1 content',
    active: true,
    icon: '<img src="./assets/images/icon_tabbar.png">',
    badge: 8,
  },
  {
    heading: 'tab2',
    content: 'tab2 content',
    active: false,
    icon: '<img src="./assets/images/icon_tabbar.png">',
    badge: 'dot',
  },
  { heading: 'tab3', content: 'tab3 content', active: false, disabled: true },
  { heading: 'tab4', content: 'tab4 content', active: false, removable: true },
];
const navbar_html = `
<weui-navbar>
    <weui-tab *ngFor="let item of tabs"
              [heading]="item.heading"
              [disabled]="item.disabled"
              [active]="item.active"
              [icon]="item.icon"
              [badge]="item.badge"
              (select)="_select($event)"
              (deselect)="_deselect($event)"
              (removed)="_removed($event)">{{item.content}}</weui-tab>
</weui-navbar>
`;
const tabbar_html = `
<weui-tabbar>
    <weui-tab *ngFor="let item of tabs"
              [heading]="item.heading"
              [disabled]="item.disabled"
              [active]="item.active"
              [icon]="item.icon"
              [badge]="item.badge"
              (select)="_select($event)"
              (deselect)="_deselect($event)"
              (removed)="_removed($event)">{{item.content}}</weui-tab>
</weui-tabbar>
`;

function getItems(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.weui-navbar__item');
}

function getItemsByTabbar(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.weui-tabbar__item');
}

function getContents(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('weui-tab');
}

function expectActiveTabs(nativeEl: HTMLElement, action: boolean[]) {
  const items = getItems(nativeEl),
    contents = getContents(nativeEl);

  expect(items.length).toBe(action.length);
  expect(contents.length).toBe(action.length);
  for (let i = 0; i < action.length; i++) {
    if (action[i]) {
      expect(items[i].classList).toContain('weui-bar__item_on');
      expect(contents[i].classList).toContain('active');
    } else {
      expect(items[i].classList).not.toContain('weui-bar__item_on');
      expect(contents[i].classList).not.toContain('active');
    }
  }
}

describe('Component: Tabs', () => {
  let fixture: ComponentFixture<TestTabComponent>;
  let context: TestTabComponent;
  let el: any;

  describe('[Navbar]', () => {
    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestTabComponent],
          imports: [TabModule.forRoot()],
        });
        TestBed.overrideComponent(TestTabComponent, {
          set: { template: navbar_html },
        });
        fixture = TestBed.createComponent(TestTabComponent);
        context = fixture.componentInstance;
        spyOn(context, '_select');
        spyOn(context, '_deselect');
        spyOn(context, '_removed');
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    it('should select first tab as active by default', () => {
      expectActiveTabs(el, [true, false, false, false]);
    });

    it('should set tab active', () => {
      (getItems(el)[1] as HTMLElement).click();
      fixture.detectChanges();
      expectActiveTabs(el, [false, true, false, false]);
    });

    it('should set tab heading', () => {
      const newTitle: string = 'new title';
      context.tabs[0].heading = newTitle;
      fixture.detectChanges();
      expect(getItems(el)[0].innerHTML).toBe(newTitle);
    });

    it('should set tab disabled', () => {
      expect(getItems(el)[2].classList).toContain('disabled');
    });

    it('should ignore click on disalbed tab', () => {
      (getItems(el)[2] as HTMLElement).click();
      fixture.detectChanges();
      expectActiveTabs(el, [true, false, false, false]);
    });

    it('should emit select event', () => {
      (getItems(el)[1] as HTMLElement).click();
      fixture.detectChanges();

      expect(context._deselect).toHaveBeenCalled();
      expect(context._select).toHaveBeenCalledWith(
        jasmine.objectContaining({
          heading: 'tab2',
        }),
      );
    });
  });

  describe('[Tabbar]', () => {
    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestTabComponent],
          imports: [TabModule.forRoot()],
        });
        TestBed.overrideComponent(TestTabComponent, {
          set: { template: tabbar_html },
        });
        fixture = TestBed.createComponent(TestTabComponent);
        context = fixture.componentInstance;
        spyOn(context, '_select');
        spyOn(context, '_deselect');
        spyOn(context, '_removed');
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    it('should set tab has icon', () => {
      expect(
        (getItemsByTabbar(el)[0] as HTMLElement).querySelector(
          '.weui-tabbar__icon',
        ),
      ).not.toBeNull();
    });

    it('should set tab badge number value', () => {
      expect(
        (getItemsByTabbar(el)[0] as HTMLElement).querySelector('.weui-badge')
          .innerHTML,
      ).toBe('8');
    });

    it('should set tab badge dot value', () => {
      expect(
        (getItemsByTabbar(el)[1] as HTMLElement).querySelector('.weui-badge')
          .classList,
      ).toContain('weui-badge_dot');
    });
  });
});

@Component({ template: `` })
class TestTabComponent {
  tabs: any[] = Object.assign([], TABS);

  _select(e: TabModule): TabModule {
    return e;
  }

  _deselect(e: TabModule): TabModule {
    return e;
  }

  _removed(e: TabModule): TabModule {
    return e;
  }
}
