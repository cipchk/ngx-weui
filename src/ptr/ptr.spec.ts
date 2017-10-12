import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { PTRModule, PTRComponent } from '../ptr';

describe('Component: PTR', () => {

    let fixture: ComponentFixture<TestPTRComponent>;
    let context: TestPTRComponent;
    let el: HTMLDivElement;
    let comp: PTRComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestPTRComponent],
            imports: [PTRModule.forRoot(), NoopAnimationsModule ]
        });
        fixture = TestBed.createComponent(TestPTRComponent);
        context = fixture.componentInstance;
        spyOn(context, 'onScroll');
        spyOn(context, 'onRefresh');
        fixture.detectChanges();
        el = fixture.nativeElement;
        comp = fixture.debugElement.query(By.css('weui-ptr')).componentInstance as PTRComponent;
        tick();
    }));

    it('should correctly initialize and attach to DOM', () => { 
        expect(el.querySelector('.weui-ptr__loader')).not.toBeNull();
        expect(el.querySelector('.weui-ptr__content')).not.toBeNull();
        expect(el.querySelectorAll('.weui-cell_access').length).toBe(context.items.length);
    });

});

@Component({ template: `
<weui-ptr (scroll)="onScroll($event)" (refresh)="onRefresh($event)" style="height: 200px; background: rgb(255, 255, 255);">
    <div class="weui-cells__title">List with link</div>
    <div class="weui-cells">
        <a *ngFor="let i of items" class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__bd">{{i}}</div>
            <div class="weui-cell__ft"></div>
        </a>
    </div>
</weui-ptr>
` })
class TestPTRComponent {

    items: any[] = Array(6).fill({}).map((v: any, idx: number) => {
        return `${idx}:${Math.random()}`;
    });
    onRefresh(ptr: PTRComponent) { return ptr; }
    onScroll(percent: number) { return percent; }
}
