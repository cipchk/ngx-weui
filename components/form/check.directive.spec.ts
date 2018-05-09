import { Component, ViewChild, DebugElement } from '@angular/core';
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
import { ChecklistDirective } from './check.directive';

const DATALIST = ['A', 'B'];

describe('Directive: Checklist', () => {
  let fixture: ComponentFixture<TestInputComponent>;
  let context: TestInputComponent;
  let directives: ChecklistDirective[];

  beforeEach(
    fakeAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestInputComponent],
        imports: [FormModule.forRoot()],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      });

      fixture = TestBed.createComponent(TestInputComponent);
      context = fixture.componentInstance;

      const inputs = fixture.debugElement.queryAll(
        By.directive(ChecklistDirective),
      );
      directives = inputs.map(
        (de: DebugElement) =>
          de.injector.get(ChecklistDirective) as ChecklistDirective,
      );

      fixture.detectChanges();
      tick();
    }),
  );

  it('should be inited', () => {
    expect(directives).not.toBeNull();
    expect(directives.length).toBe(DATALIST.length);
  });

  it(`should be set value [ 'A' ] By Click`, () => {
    fixture.nativeElement.querySelector('.weui-check').click();
    fixture.detectChanges();
    expect(context.res.length).toBe(1);
    expect(context.res[0]).toBe(DATALIST[0]);
  });

  it('should be unchecked', () => {
    fixture.nativeElement.querySelector('.weui-check').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.weui-check').click();
    fixture.detectChanges();
    expect(context.res.length).toBe(0);
  });
});

@Component({
  template: `
    <div class="weui-cells weui-cells_checkbox" *ngIf="show">
        <label class="weui-cell weui-check__label" for="checkbox-{{i}}"
            *ngFor="let i of list; let index = index">
            <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check"
                    [weui-checklist]="res" name="radio1" [weui-value]="i" id="checkbox-{{i}}">
                <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
                <p>{{i}}</p>
            </div>
        </label>
    </div>
    `,
})
class TestInputComponent {
  show: boolean = true;
  list: string[] = Object.assign([], DATALIST);
  res: string[] = [];
}
