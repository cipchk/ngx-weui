import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { CellModule, SwipeDirective } from '../cell';

const html = `
        <div class="weui-cell weui-cell_swiped" weui-swipe [weui-width]="width">
            <div class="weui-cell__bd">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <p>标题文字</p>
                    </div>
                    <div class="weui-cell__ft">向左滑动试试</div>
                </div>
            </div>
            <div class="weui-cell__ft">
                <a class="weui-swiped-btn weui-swiped-btn_warn" href="javascript:">删除</a>
            </div>
        </div>
`;

describe('Directive: Swipe', () => {
    let fixture: ComponentFixture<TestSwipeComponent>;
    let context: any;
    let el: any;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestSwipeComponent],
            imports: [CellModule.forRoot(), FormsModule],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
        });
        TestBed.overrideComponent(TestSwipeComponent, { set: { template: html } });
        fixture = TestBed.createComponent(TestSwipeComponent);
        context = fixture.debugElement.componentInstance;
        el = fixture.nativeElement;
        fixture.detectChanges();
        tick();
    }));

    describe('default', () => {

        it('should init', fakeAsync(() => {
            expect(el.querySelector('.weui-cell__bd').style.transform).toBe('translateX(0px)');
        }));

    });

});

@Component({
    selector: 'test-swipe',
    template: ''
})
class TestSwipeComponent {
    width: number = 68;
}
