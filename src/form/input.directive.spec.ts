import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormModule, InputDirective } from '../form';

describe('Directive: Input', () => {

    let fixture: ComponentFixture<TestInputComponent>;
    let context: TestInputComponent;
    let directive: InputDirective;
    let inputEl: HTMLInputElement;

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
        inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

        let inputs = fixture.debugElement.queryAll(By.directive(InputDirective));
        directive = inputs.map((de: DebugElement) => de.injector.get(InputDirective) as InputDirective)[0];

        fixture.detectChanges();
        tick();
    }));

    it('should be defined on the test component', () => {
        expect(directive).not.toBeNull();
    });

    const TYPES_IT: any = {
        qq: { valid: '94458893', invalid: '94458893a' },
        digit: { valid: '123.45', invalid: '123.45a' },
        tel: { valid: '021-11111111', invalid: '021-11111111a' },
        email: { valid: 'cipchk@qq.com', invalid: 'cipchk@qq' },
        mobile: { valid: '15900000000', invalid: '1590000000' },
        idcard: { valid: '350000000000000000', invalid: '35000000000000000a' }
    };

    for (let key of Object.keys(TYPES_IT)) {
        describe(`[type="${key}"]`, () => {

            it(`should not error on valid ${key}`, () => {
                context.type = key;
                expectValidator(TYPES_IT[key].valid, true);
            });

            it('should error on invalid qq', () => {
                context.type = key;
                expectValidator(TYPES_IT[key].invalid, false);
            });

        });
    }

    it(`should not error on valid custom regular`, () => {
        context.regex = '[0-9]+';
        expectValidator('123', true);
    });

    it(`should error on invalid custom regular`, () => {
        context.regex = '[0-9]+';
        expectValidator('123a', false);
    });

});

@Component({
    template: `
    <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">test</label></div>
        <div class="weui-cell__bd">
            <input [(ngModel)]="val" name="val"
                [weui-input]="type"
                [weui-required]="required"
                [weui-regex]="regex"
                [weui-cleaner]="cleaner"
                [formControl]="control">
        </div>
        <div class="weui-cell__ft"></div>
    </div>
    `
})
class TestInputComponent {
    val: string = '';
    type: string = 'mobile';
    required: 'info' | 'warn' | 'waiting' = 'warn';
    regex: string = null;
    cleaner: boolean = false;

    control = new FormControl();
}
