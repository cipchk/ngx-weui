import { Subscriber } from 'rxjs/Rx';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogModule, DialogComponent, DialogConfig, DialogService } from '../dialog';

const CONFIG: DialogConfig = <DialogConfig>{
    title: 'title',
    content: 'content',
    skin: 'ios',
    cancel: 'Cancel',
    cancelType: 'default',
    confirm: 'Confirm',
    confirmType: 'primary',
    backdrop: false
}

const BTNS: any[] = [
    { text: '否', type: 'default', value: 1 },
    { text: '不确定', type: 'warn', value: 2 },
    { text: '是', type: 'primary', value: 3 }
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

describe('Component: Dialog', () => {

    describe('[default]', () => {
        let fixture: ComponentFixture<TestDialogComponent>;
        let context: TestDialogComponent;
        let dl: DebugElement;
        let el: any;

        const html = `
            <weui-dialog [config]="config"></weui-dialog>
        `;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestDialogComponent],
                imports: [DialogModule.forRoot(), FormsModule, NoopAnimationsModule],
                providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
            });
            TestBed.overrideComponent(TestDialogComponent, { set: { template: html } });
            fixture = TestBed.createComponent(TestDialogComponent);
            context = fixture.componentInstance;
            dl = fixture.debugElement;
            el = fixture.nativeElement;
            fixture.detectChanges();
            tick();
        }));

        it('should init', fakeAsync(() => {
            context.dialog.show();
            fixture.detectChanges();
            expect(getTitle(el).textContent).toBe(CONFIG.title);
            expect(getContent(el).textContent).toBe(CONFIG.content);
            expect(getActions(el).length).toBe(2);
        }));

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
            context.config.skin = 'android';
            context.dialog.show();
            fixture.detectChanges();
            expect(dl.query(By.css('.weui-skin_android'))).not.toBeNull();
        });

        it('should be opened set dialog action items', () => {
            context.dialog.show();
            fixture.detectChanges();
            expect(dl.query(By.css('.weui-dialog__btn_' + CONFIG.cancelType))).not.toBeNull();
            expect(dl.query(By.css('.weui-dialog__btn_' + CONFIG.confirmType))).not.toBeNull();
        });

        it('should be opened set dialog three action items', () => {
            context.config.btns = Object.assign([], BTNS); 
            context.dialog.show();
            fixture.detectChanges();
            expect(dl.query(By.css('.weui-dialog__btn_default'))).not.toBeNull();
            expect(dl.query(By.css('.weui-dialog__btn_warn'))).not.toBeNull();
            expect(dl.query(By.css('.weui-dialog__btn_primary'))).not.toBeNull();
        });

        it('should close a dialog and get back a value [false] result', (done: () => void) => {
            context
                .dialog
                .show()
                .subscribe(res => {
                    expect(res.value).toBeFalsy();
                    done();
                });
            fixture.detectChanges();
            (<any>getActions(el)[0]).click();
        });

        it('should close a dialog and get back a value [true] result', (done: () => void) => {
            context
                .dialog
                .show()
                .subscribe(res => {
                    expect(res.value).toBeTruthy();
                    done();
                });
            fixture.detectChanges();
            (<any>getActions(el)[1]).click();
        });

        it('should close a dialog by click mask', (done: () => void) => {
            context.config.backdrop = true;
            context.dialog.show();
            fixture.detectChanges();
            context.dialog.close.subscribe(() => {
                expect(true).toBeTruthy();
                done();
            });
            el.querySelector('.weui-mask').click();
        });

    });

    describe('[service]', () => {

        let service: DialogService;
        let fixture: any;
        let context: TestDialogServiceComponent;
        let dl: DebugElement;
        let el: any;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [DialogModule.forRoot(), FormsModule, NoopAnimationsModule],
                declarations: [TestDialogServiceComponent],
                providers: [DialogService]
            }).createComponent(TestDialogServiceComponent);

            fixture = TestBed.createComponent(TestDialogServiceComponent);
            context = fixture.componentInstance;
            dl = fixture.debugElement;
            el = fixture.nativeElement;
            fixture.detectChanges();
        }));

        beforeEach(inject([DialogService], (_s: DialogService) => {
            service = _s;
        }));

        it('should close a dialog and get back a value [true] result', (done: () => void) => {
            service
                .show(Object.assign({}, CONFIG))
                .subscribe(res => {
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
    template: `<h1>Test Service</h1>`
})
class TestDialogServiceComponent { }

@Component({
    selector: 'test-dialog',
    template: ''
})
class TestDialogComponent {

    @ViewChild(DialogComponent) dialog: DialogComponent;

    config: DialogConfig = Object.assign({}, CONFIG);

}
