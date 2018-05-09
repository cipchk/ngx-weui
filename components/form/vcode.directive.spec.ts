import { Observable, Subscription, of } from 'rxjs';
import { Component, ViewChild, DebugElement } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
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

import { FormModule } from './form.module';
import { VCodeDirective } from './vcode.directive';

const SECONDS: number = 10;
const TPL: string = '${num}s';
const ERRORS: string = 'resend';

const html = `
<div class="weui-cell weui-cell_vcode">
    <div class="weui-cell__hd"></div>
    <div class="weui-cell__bd"></div>
    <div class="weui-cell__ft">
        <button
            [weui-vcode]="onSendCode"
            [weui-seconds]="seconds"
            [weui-tpl]="tpl"
            [weui-error]="error">获取验证码</button>
    </div>
</div>
`;

const htmlInValid = `<button weui-vcode></button>`;

describe('Directive: vcode', () => {
  let fixture: ComponentFixture<TestVCodeComponent>;
  let context: TestVCodeComponent;
  let directive: VCodeDirective;
  let buttonEl: HTMLButtonElement;

  describe('[default]', () => {
    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestVCodeComponent],
          imports: [FormModule.forRoot(), FormsModule],
          providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        });

        TestBed.overrideComponent(TestVCodeComponent, {
          set: { template: html },
        });
        fixture = TestBed.createComponent(TestVCodeComponent);
        context = fixture.componentInstance;

        buttonEl = fixture.debugElement.query(By.css('button'))
          .nativeElement as HTMLButtonElement;

        const ds = fixture.debugElement.queryAll(By.directive(VCodeDirective));
        directive = ds.map(
          (de: DebugElement) =>
            de.injector.get(VCodeDirective) as VCodeDirective,
        )[0];

        fixture.detectChanges();

        tick();
      }),
    );

    it('should be defined on the test component', () => {
      expect(directive).not.toBeNull();
    });

    it('should set the default values', () => {
      expect(directive.error).toBe(ERRORS);
      expect(directive.tpl).toBe(TPL);
      expect(directive.seconds).toBe(SECONDS);
    });

    it('should button disabled by sended', () => {
      context.seconds = 0;
      buttonEl.click();
      fixture.detectChanges();
      expect(buttonEl.disabled).toBeTruthy();
    });

    it('should be resend in to late', (done: () => void) => {
      context.seconds = 2;
      fixture.detectChanges();
      buttonEl.click();
      fixture.detectChanges();
      expect(buttonEl.disabled).toBeTruthy();
      setTimeout(() => {
        expect(buttonEl.disabled).toBeFalsy();
        done();
      }, 2500);
    });
  });

  it('should be console.error if invalid html', () => {
    spyOn(console, 'error');
    TestBed.configureTestingModule({
      declarations: [TestVCodeComponent],
      imports: [FormModule.forRoot(), FormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    TestBed.overrideComponent(TestVCodeComponent, {
      set: { template: htmlInValid },
    });
    TestBed.createComponent(TestVCodeComponent).detectChanges();
    expect(console.error).toHaveBeenCalled();
  });

  describe('send error', () => {
    beforeEach(
      fakeAsync(() => {
        TestBed.configureTestingModule({
          declarations: [TestVCodeComponent],
          imports: [FormModule.forRoot(), FormsModule],
          providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
        });

        TestBed.overrideComponent(TestVCodeComponent, {
          set: { template: html },
        });
        fixture = TestBed.createComponent(TestVCodeComponent);
        context = fixture.componentInstance;

        spyOn(context, 'onSendCode').and.returnValue(of(false));

        buttonEl = fixture.debugElement.query(By.css('button'))
          .nativeElement as HTMLButtonElement;

        const ds = fixture.debugElement.queryAll(By.directive(VCodeDirective));
        directive = ds.map(
          (de: DebugElement) =>
            de.injector.get(VCodeDirective) as VCodeDirective,
        )[0];

        fixture.detectChanges();

        tick();
      }),
    );

    it('should be resend', () => {
      buttonEl.click();
      fixture.detectChanges();
      expect(buttonEl.textContent).toBe(ERRORS);
    });
  });
});

@Component({ template: `` })
class TestVCodeComponent {
  tpl: string = TPL;
  seconds: number = SECONDS;
  error: string = ERRORS;

  onSendCode(): Observable<boolean> {
    return of(true);
  }
}
