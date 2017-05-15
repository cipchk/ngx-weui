import { Observable, Subscriber } from 'rxjs/Rx';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormModule, VCodeDirective } from '../form';

const SECONDS: number = 10;
const TPL: string = '${num}s';
const ERRORS: string = 'resend';

describe('Directive: vcode', () => {

    let fixture: ComponentFixture<TestVCodeComponent>;
    let context: TestVCodeComponent;
    let directive: VCodeDirective;
    let buttonEl: HTMLButtonElement;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestVCodeComponent],
            imports: [FormModule.forRoot(), FormsModule],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
        });

        fixture = TestBed.createComponent(TestVCodeComponent);
        context = fixture.componentInstance;

        buttonEl = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

        let ds = fixture.debugElement.queryAll(By.directive(VCodeDirective));
        directive = ds.map((de: DebugElement) => de.injector.get(VCodeDirective) as VCodeDirective)[0];

        fixture.detectChanges();

        tick();
    }));

    it('should be defined on the test component', () => {
        expect(directive).not.toBeNull();
    });

    it('should set the default values', () => {
        expect(directive.error).toBe(ERRORS);
        expect(directive.tpl).toBe(TPL);
        expect(directive.seconds).toBe(SECONDS);
    });

    it('should button disabled by sended', () => {
        buttonEl.click();
        fixture.detectChanges();
        expect(buttonEl.disabled).toBeTruthy();
    });

});

@Component({
    template: `
    <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd"></div>
        <div class="weui-cell__bd"></div>
        <div class="weui-cell__ft">
            <button class="weui-vcode-btn" 
                [weui-vcode]="onSendCode" 
                [weui-seconds]="seconds"
                [weui-tpl]="tpl"
                [weui-error]="error">获取验证码</button>
        </div>
    </div>
    `
})
class TestVCodeComponent {
    tpl: string = TPL;
    seconds: number = SECONDS;
    error: string = ERRORS;

    onSendCode(): Observable<boolean> {
        return Observable.timer(0).map((v, i) => { return true; });
    }
}
