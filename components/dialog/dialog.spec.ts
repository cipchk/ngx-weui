import { Subscription } from 'rxjs';
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
  DialogModule,
  DialogComponent,
  DialogConfig,
  DialogService,
} from '../dialog';
import { isAndroid } from '../utils/browser';

const CONFIG: DialogConfig = <DialogConfig>{
  title: 'title',
  content: 'content',
  skin: 'ios',
  cancel: 'Cancel',
  cancelType: 'default',
  confirm: 'Confirm',
  confirmType: 'primary',
  backdrop: false,
};

const BTNS: any[] = [
  { text: '否', type: 'default', value: 1 },
  { text: '不确定', type: 'warn', value: 2 },
  { text: '是', type: 'primary', value: 3 },
];

function getTitle(nativeEl: HTMLElement): Element {
  return nativeEl.querySelector('.weui-dialog__title');
}

function getContent(nativeEl: HTMLElement): Element {
  return nativeEl.querySelector('.weui-dialog__bd');
}

function getActions(nativeEl: HTMLElement): NodeListOf<Element> {
  return nativeEl.querySelectorAll('.weui-dialog__ft .weui-dialog__btn');
}

function getCog(cog: any) {
  return Object.assign({}, CONFIG, cog);
}

describe('Component: Dialog', () => {
  describe('[default]', () => {
    let fixture: ComponentFixture<TestDialogComponent>;
    let context: TestDialogComponent;
    let dl: DebugElement;
    let el: any;

    const html = `
            <weui-dialog [config]="config"></weui-dialog>
        `;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestDialogComponent],
          imports: [DialogModule.forRoot(), FormsModule, NoopAnimationsModule],
          providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        });
        TestBed.overrideComponent(TestDialogComponent, {
          set: { template: html },
        });
        fixture = TestBed.createComponent(TestDialogComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    it('should init', () => {
      context.dialog.show();
      fixture.detectChanges();
      expect(getTitle(el).textContent).toBe(CONFIG.title);
      expect(getContent(el).textContent).toBe(CONFIG.content);
      expect(getActions(el).length).toBe(2);
    });

    it('should auto style', () => {
      context.config = Object.assign({}, context.config, { skin: 'auto' });
      context.dialog.show();
      fixture.detectChanges();
      if (isAndroid()) {
        expect(
          (el as HTMLElement).querySelectorAll('.weui-skin_android').length,
        ).toBe(1);
      } else {
        expect(true).toBeTruthy();
      }
    });

    it('should be opened set dialog title', () => {
      context.dialog.show();
      fixture.detectChanges();
      expect(getTitle(el).textContent).toBe(CONFIG.title);
    });

    it('should be opened set dialog content', () => {
      context.dialog.show();
      fixture.detectChanges();
      expect(getContent(el).textContent).toBe(CONFIG.content);
    });

    it('should be opened set dialog android style', () => {
      context.config = getCog({ skin: 'android' });
      context.dialog.show();
      fixture.detectChanges();
      expect(dl.query(By.css('.weui-skin_android'))).not.toBeNull();
    });

    it('should be opened set dialog action items', () => {
      context.dialog.show();
      fixture.detectChanges();
      expect(
        dl.query(By.css('.weui-dialog__btn_' + CONFIG.cancelType)),
      ).not.toBeNull();
      expect(
        dl.query(By.css('.weui-dialog__btn_' + CONFIG.confirmType)),
      ).not.toBeNull();
    });

    it('should be opened set dialog three action items', () => {
      context.config = getCog({ btns: BTNS });
      context.dialog.show();
      fixture.detectChanges();
      expect(dl.query(By.css('.weui-dialog__btn_default'))).not.toBeNull();
      expect(dl.query(By.css('.weui-dialog__btn_warn'))).not.toBeNull();
      expect(dl.query(By.css('.weui-dialog__btn_primary'))).not.toBeNull();
    });

    it('should close a dialog and get back a value [false] result', (done: () => void) => {
      context.dialog.show().subscribe(res => {
        expect(res.value).toBeFalsy();
        done();
      });
      fixture.detectChanges();
      (<any>getActions(el)[0]).click();
    });

    it('should close a dialog and get back a value [true] result', (done: () => void) => {
      context.dialog.show().subscribe(res => {
        expect(res.value).toBeTruthy();
        done();
      });
      fixture.detectChanges();
      (<any>getActions(el)[1]).click();
    });

    it('should close a dialog by click mask', (done: () => void) => {
      context.config = getCog({ backdrop: true });
      context.dialog.show();
      fixture.detectChanges();
      context.dialog.close.subscribe(() => {
        expect(true).toBeTruthy();
        done();
      });
      el.querySelector('.weui-mask').click();
    });

    it('should click backdrop not-allow closing', () => {
      context.config = Object.assign(context.config, { backdrop: false });
      context.dialog.show().subscribe();
      fixture.detectChanges();
      el.querySelector('.weui-mask').click();
      expect(context.dialog._shown).toBe(true);
    });
  });

  describe('[prompt]', () => {
    let fixture: ComponentFixture<TestDialogComponent>;
    let context: TestDialogComponent;
    let dl: DebugElement;
    let el: any;

    const html = `
            <weui-dialog [config]="config"></weui-dialog>
        `;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestDialogComponent],
          imports: [DialogModule.forRoot(), FormsModule, NoopAnimationsModule],
          providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        });
        TestBed.overrideComponent(TestDialogComponent, {
          set: { template: html },
        });
        fixture = TestBed.createComponent(TestDialogComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
      }),
    );

    const TYPES: any[] = [
      {
        input: 'checkbox',
        inputValue: 'durex',
        inputOptions: [
          { text: '请选择', value: 'choose' },
          { text: '杜蕾斯', value: 'durex', other: 1 },
          { text: '杰士邦', value: 'jissbon' },
          { text: '多乐士', value: 'donless' },
          { text: '处男', value: 'first' },
        ],
      },
      {
        input: 'email',
        inputValue: 'cipchk@qq.com',
        result: 'asdf@qq.com',
        inputRequired: true,
      },
      { input: 'url', inputValue: 'https://cipchk.github.io/ngx-weui/' },
    ];
    for (const item of TYPES) {
      it(`should be return ${item.input}`, (done: () => void) => {
        context.config = Object.assign({}, CONFIG, item, { type: 'prompt' });
        context.dialog.show().subscribe(res => {
          if (Array.isArray(res.result)) res.result = res.result[0];
          expect(res.result).toBe(item.result || item.inputValue);
          done();
        });
        fixture.detectChanges();
        if (item.result) {
          context.dialog._promptData = item.result;
          context.dialog._chanage();
          fixture.detectChanges();
        }
        expect(dl.queryAll(By.css('.weui-dialog__prompt')).length).toBe(1);
        (<any>getActions(el)[1]).click();
      });
    }

    it('should be regex error in text', () => {
      const ERROR = '格式不正确';
      context.config = Object.assign({}, CONFIG, TYPES[0], {
        type: 'prompt',
        inputRequired: true,
        inputValue: '123',
        inputRegex: /^[a-z]+$/,
        inputError: ERROR,
      });
      console.log(context.config);
      context.dialog.show().subscribe();
      fixture.detectChanges();
      expect(dl.queryAll(By.css('.weui-dialog__prompt')).length).toBe(1);
      (<any>getActions(el)[1]).click();
      fixture.detectChanges();
      const errorEl = dl.queryAll(By.css('.weui-dialog__error'));
      expect(errorEl.length).toBe(1);
      expect((errorEl[0].nativeElement as HTMLDivElement).textContent).toBe(
        ERROR,
      );
    });

    it('should be required in checkbox', () => {
      const ERROR = '必填';
      context.config = Object.assign({}, CONFIG, TYPES[0], {
        type: 'prompt',
        inputRequired: true,
        inputValue: undefined,
        inputError: ERROR,
      });
      console.log(context.config);
      context.dialog.show().subscribe();
      fixture.detectChanges();
      expect(dl.queryAll(By.css('.weui-dialog__prompt')).length).toBe(1);
      (<any>getActions(el)[1]).click();
      fixture.detectChanges();
      const errorEl = dl.queryAll(By.css('.weui-dialog__error'));
      expect(errorEl.length).toBe(1);
      expect((errorEl[0].nativeElement as HTMLDivElement).textContent).toBe(
        ERROR,
      );
    });

    it(
      'should be auto focus and enter return',
      fakeAsync(() => {
        const VALUE = 'cipchk@qq.com';
        context.config = Object.assign({}, CONFIG, {
          type: 'prompt',
          input: 'email',
          inputValue: VALUE,
        });
        context.dialog.show().subscribe(res => {
          expect(res.result).toBe(VALUE);
        });
        fixture.detectChanges();
        tick(300);
        // spy
        context.dialog._keyup(<any>{ keyCode: 13 });
        fixture.detectChanges();
      }),
    );
  });

  describe('[service]', () => {
    let service: DialogService;
    let fixture: any;
    let context: TestDialogServiceComponent;
    let dl: DebugElement;
    let el: any;

    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          imports: [DialogModule.forRoot(), FormsModule, NoopAnimationsModule],
          declarations: [TestDialogServiceComponent],
          providers: [DialogService],
        }).createComponent(TestDialogServiceComponent);

        fixture = TestBed.createComponent(TestDialogServiceComponent);
        context = fixture.componentInstance;
        dl = fixture.debugElement;
        el = fixture.nativeElement;
        fixture.detectChanges();
      }),
    );

    beforeEach(
      inject([DialogService], (_s: DialogService) => {
        service = _s;
      }),
    );

    it('should close a dialog and get back a value [true] result', (done: () => void) => {
      service.show(Object.assign({}, CONFIG)).subscribe(res => {
        fixture.detectChanges();
        expect(res.value).toBeTruthy();
        done();
      });

      fixture.detectChanges();
      (<any>getActions(el.parentElement)[1]).click();
    });
  });
});

@Component({
  template: `<h1>Test Service</h1>`,
})
class TestDialogServiceComponent {}

@Component({
  selector: 'test-dialog',
  template: '',
})
class TestDialogComponent {
  @ViewChild(DialogComponent) dialog: DialogComponent;

  config: DialogConfig = Object.assign({}, CONFIG);
}
