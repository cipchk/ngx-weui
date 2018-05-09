import { Component, ViewChild, DebugElement } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
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
import { InputDirective } from './input.directive';

const HTML = `
<div class="weui-cell">
    <div class="weui-cell__hd"><label class="weui-label">test</label></div>
    <div class="weui-cell__bd">
        <input [(ngModel)]="val" name="val"
            [weui-input]="type"
            [weui-required]="required"
            [weui-regex]="regex"
            [weui-cleaner]="cleaner">
    </div>
    <div class="weui-cell__ft"></div>
</div>
`;

const HTML_FORM = `
<div class="weui-cell">
    <div class="weui-cell__hd"><label class="weui-label">test</label></div>
    <div class="weui-cell__bd">
        <input
            [weui-input]="type"
            [weui-required]="required"
            [weui-regex]="regex"
            [weui-cleaner]="cleaner"
            [formControl]="control">
    </div>
    <div class="weui-cell__ft"></div>
</div>
`;

const HTML_InValid = `
<input [(ngModel)]="val" name="val"
    [weui-input]="type"
    [weui-required]="required"
    [weui-regex]="regex"
    [weui-cleaner]="cleaner"
    [formControl]="control">`;

describe('Directive: Input', () => {
  let fixture: ComponentFixture<TestInputComponent>;
  let context: TestInputComponent;
  let directive: InputDirective;
  let inputEl: HTMLInputElement;

  function genModule(html: string) {
    TestBed.configureTestingModule({
      declarations: [TestInputComponent],
      imports: [FormModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    TestBed.overrideComponent(TestInputComponent, {
      set: { template: html },
    });
    fixture = TestBed.createComponent(TestInputComponent);
    context = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'))
      .nativeElement as HTMLInputElement;

    const inputs = fixture.debugElement.queryAll(By.directive(InputDirective));
    directive = inputs.map(
      (de: DebugElement) => de.injector.get(InputDirective) as InputDirective,
    )[0];

    fixture.detectChanges();
  }

  function expectValidator(val: string, validStatus: boolean) {
    context.control.setValue(val);
    fixture.detectChanges();
    expect(inputEl.classList).toContain(
      validStatus ? 'ng-valid' : 'ng-invalid',
    );
  }

  describe('[default]', () => {
    beforeEach(() => genModule(HTML_FORM));

    const TYPES_IT: any = {
      qq: { valid: '94458893', invalid: '94458893a' },
      digit: { valid: '123.45', invalid: '123.45a' },
      tel: { valid: '021-11111111', invalid: '021-11111111a' },
      email: { valid: 'cipchk@qq.com', invalid: 'cipchk@qq' },
      mobile: { valid: '15900000000', invalid: '1590000000' },
      idcard: { valid: '350000000000000000', invalid: '35000000000000000a' },
    };

    for (const key of Object.keys(TYPES_IT)) {
      describe(`[type="${key}"]`, () => {
        it(`should not error on valid ${key}`, () => {
          context.type = key;
          expectValidator(TYPES_IT[key].valid, true);
        });

        it(`should error on invalid ${key}`, () => {
          context.type = key;
          expectValidator(TYPES_IT[key].invalid, false);
        });
      });
    }

    it('should be defined on the test component', () => {
      expect(directive).not.toBeNull();
    });

    it(`should not error on valid custom regular`, () => {
      context.regex = '[0-9]+';
      expectValidator('123', true);
    });

    it(`should error on invalid custom regular expression`, () => {
      context.regex = /^[0-9]+$/;
      expectValidator('123a', false);
    });

    it(`should error on invalid custom regular string`, () => {
      context.regex = '[0-9]+';
      expectValidator('123a', false);
    });

    it('should be cleaner empty', () => {
      context.cleaner = true;
      context.control.setValue('1 2 3');
      fixture.detectChanges();
      expect(context.control.value).toBe('123');
    });

    it('should be inited if no specify type', () => {
      context.type = undefined;
      context.val = '123';
      fixture.detectChanges();
      expect(context.val).toBe('123');
    });

    it(`should be valid if required=undefined & value=''`, () => {
      context.required = undefined;
      expectValidator('', true);
    });

    it('should be cleaner empty', () => {
      context.cleaner = true;
      context.control.setValue('1 2 3');
      fixture.detectChanges();
      expect(context.control.value).toBe('123');
    });
  });

  it('should be throw error if invalid html', () => {
    spyOn(console, 'error');
    TestBed.configureTestingModule({
      declarations: [TestInputComponent],
      imports: [FormModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    });

    TestBed.overrideComponent(TestInputComponent, {
      set: { template: HTML_InValid },
    });
    TestBed.createComponent(TestInputComponent).detectChanges();
    expect(console.error).toHaveBeenCalled();
  });
});

@Component({ template: `` })
class TestInputComponent {
  val: string = '';
  type: string = 'mobile';
  required: 'info' | 'warn' | 'waiting' = 'warn';
  regex: RegExp | string = null;
  cleaner: boolean = false;

  control = new FormControl();
}
