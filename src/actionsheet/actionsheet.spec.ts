import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subscription } from 'rxjs/Subscription';
import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect, async, inject } from '@angular/core/testing';

import { ActionSheetModule, ActionSheetComponent, ActionSheetConfig, ActionSheetService } from '../actionsheet';

const MENUS: any[] = [
    { text: 'menu1', value: 'value1', other: 1 },
    { text: 'menu2', value: 'value2' }
];

const CONFIG: ActionSheetConfig = <ActionSheetConfig>{
    title: 'test title',
    skin: 'ios',
    cancel: '取消'
}

function getTitle(nativeEl: HTMLElement): Element {
    return nativeEl.querySelector('.weui-actionsheet__title-text');
}

function getItems(nativeEl: HTMLElement): NodeListOf<Element> {
    return nativeEl.querySelectorAll('.weui-actionsheet__menu .weui-actionsheet__cell');
}

function getAction(nativeEl: HTMLElement): Element {
    return nativeEl.querySelector('.weui-actionsheet__action .weui-actionsheet__cell');
}

describe('Component: ActionSheet', () => {

    describe('[default]', () => {
        let fixture: ComponentFixture<TestActionSheetComponent>;
        let context: TestActionSheetComponent;
        let dl: DebugElement;
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
                imports: [ActionSheetModule.forRoot(), FormsModule, NoopAnimationsModule],
                providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
            });
            TestBed.overrideComponent(TestActionSheetComponent, { set: { template: html } });
            fixture = TestBed.createComponent(TestActionSheetComponent);
            context = fixture.componentInstance;
            dl = fixture.debugElement;
            el = fixture.nativeElement;
            fixture.detectChanges();
            tick();
        }));

        it('should init', fakeAsync(() => {
            expect(getTitle(el)).not.toBeNull();
            expect(getAction(el)).not.toBeNull();
            expect(getItems(el).length).toBe(2);
        }));

        it('should be opened set actionsheet title', (done: () => void) => {
            context
                .actioinSheet
                .show()
                .subscribe(res => {
                    fixture.detectChanges();
                    const str: string = 'test title';
                    expect(getTitle(el).textContent).toBe(str);
                    done();
                });
            (<any>getItems(el)[0]).click();
        });

        it('should be opened set actionsheet items', (done: () => void) => {
            context
                .actioinSheet
                .show()
                .subscribe(res => {
                    fixture.detectChanges();
                    const items = getItems(el);
                    expect(items.length).toBe(2);
                    expect(items[0].textContent).toBe('menu1');
                    expect(items[1].textContent).toBe('menu2');
                    done();
                });
            (<any>getItems(el)[0]).click();
        });

        it('should be opened set actionsheet action', (done: () => void) => {
            context
                .actioinSheet
                .show()
                .subscribe(res => {
                    fixture.detectChanges();
                    const str: string = '取消';
                    expect(getAction(el).textContent).toBe(str);
                    done();
                });
            (<any>getItems(el)[0]).click();
        });

        it('should be opened if android not title & action', (done: () => void) => {
            context.actioinSheet.config.skin = 'android';
            fixture.detectChanges();

            context
                .actioinSheet
                .show()
                .subscribe(res => {
                    fixture.detectChanges();
                    expect(getTitle(el)).toBeNull();
                    expect(getAction(el)).toBeNull();
                    done();
                });
            (<any>getItems(el)[0]).click();
        });

        it('should choose item and get back a result', (done: () => void) => {
            fixture.detectChanges();

            context
                .actioinSheet
                .show()
                .subscribe(res => {
                    fixture.detectChanges();
                    expect(res.text).toBe('menu1');
                    expect(res.value).toBe('value1');
                    expect(res.other).toBe(1);
                    done();
                });
            (<any>getItems(el)[0]).click();
        });

        it('should click backdrop has closed', (done: () => void) => {
            context.actioinSheet.show();
            fixture.detectChanges();
            context
                .actioinSheet
                .close
                .subscribe(() => {
                    expect(true).toBeTruthy();
                    done();
                });
            el.querySelector('.weui-mask').click();
        });

    });

    describe('[service]', () => {

        let service: ActionSheetService;
        let fixture: any;
        let context: TestActionSheetServiceComponent;
        let dl: DebugElement;
        let el: any;

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                imports: [ActionSheetModule.forRoot(), FormsModule, NoopAnimationsModule],
                declarations: [TestActionSheetServiceComponent],
                providers: [ActionSheetService]
            }).createComponent(TestActionSheetServiceComponent);

            fixture = TestBed.createComponent(TestActionSheetServiceComponent);
            context = fixture.componentInstance;
            dl = fixture.debugElement;
            el = fixture.nativeElement;
            fixture.detectChanges();
        }));

        beforeEach(inject([ActionSheetService], (_s: ActionSheetService) => {
            service = _s;
        }));

        it('should return menu1', (done: () => void) => {
            service
                .show(Object.assign([], MENUS), Object.assign({}, CONFIG))
                .subscribe(res => {
                    fixture.detectChanges();
                    expect(res.text).toBe('menu1');
                    expect(res.value).toBe('value1');
                    expect(res.other).toBe(1);
                    done();
                });

            fixture.detectChanges();
            (<any>getItems(el.parentElement)[0]).click();
        });

    });

});

@Component({
    template: `<h1>Test Service</h1>`
})
class TestActionSheetServiceComponent { }

@Component({
    selector: 'test-actionsheet',
    template: ''
})
class TestActionSheetComponent {

    @ViewChild(ActionSheetComponent) actioinSheet: ActionSheetComponent;

    menus: any[] = Object.assign([], MENUS);

    config: ActionSheetConfig = Object.assign({}, CONFIG);

    _close() {
        return true;
    }

}
