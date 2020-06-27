import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { isAndroid } from 'ngx-weui/core';
// tslint:disable-next-line: no-duplicate-imports
import * as browserModule from 'ngx-weui/core';
import { ActionSheetComponent, ActionSheetConfig, ActionSheetModule, ActionSheetService } from '../actionsheet';

const MENUS: any[] = [
  { text: 'menu1', value: 'value1', other: 1 },
  { text: 'menu2', value: 'value2' },
];

const CONFIG: ActionSheetConfig = {
  title: 'test title',
  skin: 'ios',
  cancel: '取消',
} as ActionSheetConfig;

function getTitle(nativeEl: HTMLElement): Element {
  return nativeEl.querySelector('.weui-actionsheet__title-text')!;
}

function getItems(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.weui-actionsheet__menu .weui-actionsheet__cell');
}

function getAction(nativeEl: HTMLElement): Element {
  return nativeEl.querySelector('.weui-actionsheet__action .weui-actionsheet__cell')!;
}

describe('Component: ActionSheet', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestActionSheetComponent>;
    let context: TestActionSheetComponent;
    let el: any;

    const html = `
            <weui-actionsheet
                [menus]="menus"
                [config]="config"
                (close)="_close()"></weui-actionsheet>
        `;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestActionSheetComponent],
        imports: [ActionSheetModule, FormsModule, NoopAnimationsModule],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      });
      TestBed.overrideComponent(TestActionSheetComponent, {
        set: { template: html },
      });
      fixture = TestBed.createComponent(TestActionSheetComponent);
      context = fixture.componentInstance;
      el = fixture.nativeElement;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
    }));

    it('should init', fakeAsync(() => {
      expect(getTitle(el)).not.toBeNull();
      expect(getAction(el)).not.toBeNull();
      expect(getItems(el).length).toBe(2);
    }));

    it('should auto style', done => {
      context.config = { ...context.config, skin: 'auto' };
      fixture.detectChanges();
      context.actioinSheet.show().subscribe(() => {
        fixture.detectChanges();
        if (isAndroid()) {
          expect((el as HTMLElement).querySelectorAll('.weui-skin_android').length).toBe(1);
        } else {
          expect(true).toBeTruthy();
        }
        done();
      });
      (getItems(el)[0] as any).click();
    });

    xdescribe('[Android] style', () => {
      beforeEach(() => {
        spyOn(browserModule, 'isAndroid').and.returnValue(true);
      });

      it('should be inited', done => {
        context.config = { ...context.config, skin: 'auto' };
        fixture.detectChanges();
        context.actioinSheet.show().subscribe(() => {
          fixture.detectChanges();
          expect((el as HTMLElement).querySelectorAll('.weui-skin_android').length).toBe(1);
          done();
        });
        (getItems(el)[0] as any).click();
      });
    });

    it('should be opened set actionsheet title', done => {
      context.actioinSheet.show().subscribe(() => {
        fixture.detectChanges();
        const str = 'test title';
        expect(getTitle(el).textContent).toBe(str);
        done();
      });
      (getItems(el)[0] as any).click();
    });

    it('should be opened set actionsheet items', done => {
      context.actioinSheet.show().subscribe(() => {
        fixture.detectChanges();
        const items = getItems(el);
        expect(items.length).toBe(2);
        expect(items[0].textContent).toBe('menu1');
        expect(items[1].textContent).toBe('menu2');
        done();
      });
      (getItems(el)[0] as any).click();
    });

    it('should be opened set actionsheet action', done => {
      context.actioinSheet.show().subscribe(() => {
        fixture.detectChanges();
        const str = '取消';
        expect(getAction(el).textContent).toBe(str);
        done();
      });
      (getItems(el)[0] as any).click();
    });

    it('should be opened if android not title & action', done => {
      context.actioinSheet.config.skin = 'android';
      fixture.detectChanges();

      context.actioinSheet.show().subscribe(() => {
        fixture.detectChanges();
        expect(getTitle(el)).toBeNull();
        expect(getAction(el)).toBeNull();
        done();
      });
      (getItems(el)[0] as any).click();
    });

    it('should choose item and get back a result', done => {
      fixture.detectChanges();

      context.actioinSheet.show().subscribe(res => {
        fixture.detectChanges();
        expect(res.text).toBe('menu1');
        expect(res.value).toBe('value1');
        expect(res.other).toBe(1);
        done();
      });
      (getItems(el)[0] as any).click();
    });

    it('should click backdrop has closed', done => {
      context.actioinSheet.show();
      fixture.detectChanges();
      context.actioinSheet.close.subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
      el.querySelector('.weui-mask').click();
    });

    it('should click backdrop not-allow closing', () => {
      context.config = { ...context.config, backdrop: false };
      context.actioinSheet.show();
      fixture.detectChanges();
      el.querySelector('.weui-mask').click();
      expect(context.actioinSheet._shown).toBe(true);
    });
  });

  describe('[service]', () => {
    let service: ActionSheetService;
    let fixture: any;
    let el: any;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [ActionSheetModule, FormsModule, NoopAnimationsModule],
        declarations: [TestActionSheetServiceComponent],
        providers: [ActionSheetService],
      }).createComponent(TestActionSheetServiceComponent);

      fixture = TestBed.createComponent(TestActionSheetServiceComponent);
      el = fixture.nativeElement;
      fixture.detectChanges();
    }));

    beforeEach(inject([ActionSheetService], (_s: ActionSheetService) => {
      service = _s;
    }));

    it('should be show', done => {
      service.show([...MENUS]).subscribe(res => {
        fixture.detectChanges();
        expect(res.text).toBe('menu1');
        expect(res.value).toBe('value1');
        expect(res.other).toBe(1);
        setTimeout(() => {
          done();
        }, 500);
      });

      fixture.detectChanges();
      (getItems(el.nextSibling)[0] as any).click();
    });

    it('should be show if specify [config] param', () => {
      service.show([...MENUS], { ...CONFIG });
      fixture.detectChanges();
      expect(el.nextSibling.nodeName).toBe('WEUI-ACTIONSHEET');
    });
  });
});

@Component({
  template: ` <h1>Test Service</h1> `,
})
class TestActionSheetServiceComponent {}

@Component({
  selector: 'app-actionsheet',
  template: '',
})
class TestActionSheetComponent {
  @ViewChild(ActionSheetComponent, { static: true }) actioinSheet: ActionSheetComponent;

  menus: any[] = [...MENUS];

  config: ActionSheetConfig = { ...CONFIG };

  _close() {
    return true;
  }
}
