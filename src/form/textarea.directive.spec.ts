import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormModule, TextareaDirective } from '../form';

const MAXLENGTH: number = 5;

describe('Directive: Textarea', () => {

    let fixture: ComponentFixture<TestInputComponent>;
    let context: TestInputComponent;
    let directive: TextareaDirective;
    let inputEl: HTMLInputElement;
    let counterEl: HTMLElement;

    function expectValidator(val: string, validStatus: boolean) {
        context.control.setValue(val);
        fixture.detectChanges();
        expect(inputEl.classList).toContain(validStatus ? 'ng-valid' : 'ng-invalid');
    }

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestInputComponent],
            imports: [FormModule.forRoot(), FormsModule, ReactiveFormsModule],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
        });

        fixture = TestBed.createComponent(TestInputComponent);
        context = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('textarea')).nativeElement as HTMLInputElement;

        let inputs = fixture.debugElement.queryAll(By.directive(TextareaDirective));
        directive = inputs.map((de: DebugElement) => de.injector.get(TextareaDirective) as TextareaDirective)[0];

        counterEl = fixture.debugElement.query(By.css('.weui-textarea-counter')).nativeElement as HTMLElement;

        fixture.detectChanges();

        tick();
    }));

    it('should be defined on the test component', () => {
        expect(directive).not.toBeNull();
    });

    it('should set the default values', () => {
        expect(counterEl.textContent).toBe(`0 / ${MAXLENGTH}`);
    });

    it('should 2 characters in chinese', () => {
        context.val = '中国';
        context.cn = 2;
        fixture.detectChanges();
        expect(counterEl.textContent).toBe(`4 / ${MAXLENGTH}`);
    });

});

@Component({
    template: `
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <textarea class="weui-textarea" [(ngModel)]="val" name="val"
                    weui-textarea [weui-cn]="cn" [formControl]="control" [maxlength]="maxlength"></textarea>
                <div class="weui-textarea-counter"></div>
            </div>
        </div>
    </div>
    `
})
class TestInputComponent {
    val: string = '';
    cn: number = 1;
    maxlength: number = MAXLENGTH;

    control = new FormControl();
}
