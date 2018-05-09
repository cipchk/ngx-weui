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

import { Subscription } from 'rxjs';

import {
  ActionSheetModule,
  ActionSheetComponent,
  ActionSheetConfig,
  ActionSheetService,
} from '../actionsheet';
import { isAndroid } from '../utils/browser';
import * as browserModule from '../utils/browser';

const MENUS: any[] = [
  { text: 'menu1', value: 'value1', other: 1 },
  { text: 'menu2', value: 'value2' },
];

const CONFIG: ActionSheetConfig = <ActionSheetConfig>{
  title: 'test title',
  skin: 'ios',
  cancel: '取消',
};

function getTitle(nativeEl: HTMLElement): Element {
  return nativeEl.querySelector('.weui-actionsheet__title-text');
}

function getItems(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll(
    '.weui-actionsheet__menu .weui-actionsheet__cell',
  );
}

function getAction(nativeEl: HTMLElement): Element {
  return nativeEl.querySelector(
    '.weui-actionsheet__action .weui-actionsheet__cell',
  );
}

describe('Component: ActionSheet', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestActionSheetComponent>;
    let context: TestActionSheetComponent;
    let dl: DebugElement;
    let el: any;

    const html = `
            <weui-actionsheet
                [menus]="menus"
                [config]="config"
                (close)="_close()"></weui-actionsheet>
        `;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestActionSheetComponent],
          imports: [
            ActionSheetModule.forRoot(),
            FormsModule,
            NoopAnimationsModule,
          ],
          providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        });
        TestBed.overrideComponent(TestActionSheetComponent, {
          set: { template: html },
        });
        fixture = TestBed.createComponent(TestActionSheetComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    it(
      'should init',
      fakeAsync(() => {
        expect(getTitle(el)).not.toBeNull();
        expect(getAction(el)).not.toBeNull();
        expect(getItems(el).length).toBe(2);
      }),
    );

    it('should auto style', (done: () => void) => {
      context.config = Object.assign(context.config, { skin: 'auto' });
      fixture.detectChanges();
      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        if (isAndroid()) {
          expect(
            (el as HTMLElement).querySelectorAll('.weui-skin_android').length,
          ).toBe(1);
        } else {
          expect(true).toBeTruthy();
        }
        done();
      });
      (<any>getItems(el)[0]).click();
    });

    describe('[Android] style', () => {
      beforeEach(() => {
        spyOn(browserModule, 'isAndroid').and.returnValue(true);
      });

      it('should be inited', (done: () => void) => {
        context.config = Object.assign(context.config, { skin: 'auto' });
        fixture.detectChanges();
        context.actioinSheet.show().subscribe(res => {
          fixture.detectChanges();
          expect(
            (el as HTMLElement).querySelectorAll('.weui-skin_android').length,
          ).toBe(1);
          done();
        });
        (<any>getItems(el)[0]).click();
      });
    });

    it('should be opened set actionsheet title', (done: () => void) => {
      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        const str: string = 'test title';
        expect(getTitle(el).textContent).toBe(str);
        done();
      });
      (<any>getItems(el)[0]).click();
    });

    it('should be opened set actionsheet items', (done: () => void) => {
      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        const items = getItems(el);
        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('menu1');
        expect(items[1].textContent).toBe('menu2');
        done();
      });
      (<any>getItems(el)[0]).click();
    });

    it('should be opened set actionsheet action', (done: () => void) => {
      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        const str: string = '取消';
        expect(getAction(el).textContent).toBe(str);
        done();
      });
      (<any>getItems(el)[0]).click();
    });

    it('should be opened if android not title & action', (done: () => void) => {
      context.actioinSheet.config.skin = 'android';
      fixture.detectChanges();

      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        expect(getTitle(el)).toBeNull();
        expect(getAction(el)).toBeNull();
        done();
      });
      (<any>getItems(el)[0]).click();
    });

    it('should choose item and get back a result', (done: () => void) => {
      fixture.detectChanges();

      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        expect(res.text).toBe('menu1');
        expect(res.value).toBe('value1');
        expect(res.other).toBe(1);
        done();
      });
      (<any>getItems(el)[0]).click();
    });

    it('should click backdrop has closed', (done: () => void) => {
      context.actioinSheet.show();
      fixture.detectChanges();
      context.actioinSheet.close.subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
      el.querySelector('.weui-mask').click();
    });

    it('should click backdrop not-allow closing', () => {
      context.config = Object.assign(context.config, { backdrop: false });
      context.actioinSheet.show();
      fixture.detectChanges();
      el.querySelector('.weui-mask').click();
      expect(context.actioinSheet._shown).toBe(true);
    });
  });

  describe('[service]', () => {
    let service: ActionSheetService;
    let fixture: any;
    let context: TestActionSheetServiceComponent;
    let dl: DebugElement;
    let el: any;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          imports: [
            ActionSheetModule.forRoot(),
            FormsModule,
            NoopAnimationsModule,
          ],
          declarations: [TestActionSheetServiceComponent],
          providers: [ActionSheetService],
        }).createComponent(TestActionSheetServiceComponent);

        fixture = TestBed.createComponent(TestActionSheetServiceComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
      }),
    );

    beforeEach(
      inject([ActionSheetService], (_s: ActionSheetService) => {
        service = _s;
      }),
    );

    it('should be show', (done: () => void) => {
      service.show(Object.assign([], MENUS)).subscribe(res => {
        fixture.detectChanges();
        expect(res.text).toBe('menu1');
        expect(res.value).toBe('value1');
        expect(res.other).toBe(1);
        setTimeout(() => {
          done();
        }, 500);
      });

      fixture.detectChanges();
      (<any>getItems(el.nextSibling)[0]).click();
    });

    it('should be show if specify [config] param', () => {
      service.show(Object.assign([], MENUS), Object.assign({}, CONFIG));
      fixture.detectChanges();
      expect(el.nextSibling.nodeName).toBe('WEUI-ACTIONSHEET');
    });
  });
});

@Component({
  template: `<h1>Test Service</h1>`,
})
class TestActionSheetServiceComponent {}

@Component({
  selector: 'test-actionsheet',
  template: '',
})
class TestActionSheetComponent {
  @ViewChild(ActionSheetComponent) actioinSheet: ActionSheetComponent;

  menus: any[] = Object.assign([], MENUS);

  config: ActionSheetConfig = Object.assign({}, CONFIG);

  _close() {
    return true;
  }
}
