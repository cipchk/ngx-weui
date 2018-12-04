import { Component, ViewChild, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  async,
  inject,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule } from './form.module';
import { TextareaDirective } from './textarea.directive';

const MAXLENGTH: number = 5;

describe('Directive: Textarea', () => {
  let fixture: ComponentFixture<TestInputComponent>;
  let context: TestInputComponent;
  let directive: TextareaDirective;
  let inputEl: HTMLInputElement;
  let counterEl: HTMLElement;

  function setValue(value: string) {
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestInputComponent],
      imports: [FormModule.forRoot(), FormsModule],
    });

    fixture = TestBed.createComponent(TestInputComponent);
    context = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('textarea'))
      .nativeElement as HTMLInputElement;

    const inputs = fixture.debugElement.queryAll(
      By.directive(TextareaDirective),
    );
    directive = inputs.map(
      (de: DebugElement) =>
        de.injector.get(TextareaDirective) as TextareaDirective,
    )[0];

    counterEl = fixture.debugElement.query(By.css('.weui-textarea-counter'))
      .nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should set the default values', () => {
    expect(counterEl.textContent).toBe(`0 / ${MAXLENGTH}`);
  });

  it('should 2 characters in chinese', () => {
    context.cn = 2;
    fixture.detectChanges();
    setValue('中国');
    expect(counterEl.textContent).toBe(`4 / ${MAXLENGTH}`);
  });

  it('should 3 characters in chinese', () => {
    context.cn = 3;
    fixture.detectChanges();
    setValue('中国');
    expect(counterEl.textContent).toBe(`6 / ${MAXLENGTH}`);
  });

  it('should be inited if nospecify [maxlength]', () => {
    context.maxlength = 0;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '.weui-textarea-counter',
      ).length,
    ).toBe(0);
  });
});

@Component({
  template: `
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" [(ngModel)]="val" name="val"
                    weui-textarea [weui-cn]="cn" [maxlength]="maxlength"></textarea>
                <div class="weui-textarea-counter"></div>
            </div>
        </div>
    </div>
    `,
})
class TestInputComponent {
  val: string = '';
  cn: number = 1;
  maxlength: number = MAXLENGTH;
}
