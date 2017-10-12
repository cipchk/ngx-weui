import { Subscriber } from 'rxjs/Subscriber';
import { Component, ViewChild, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, fakeAsync, tick, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidebarModule, SidebarContainerComponent, SidebarComponent, CloseSidebarDirective } from '../sidebar';


describe('Component: Sidebar', () => {
    let fixture: ComponentFixture<TestSidebarComponent>;
    let context: TestSidebarComponent;
    let el: HTMLElement;

    describe('[basic]', () => {

        beforeEach(fakeAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestSidebarComponent],
                imports: [SidebarModule.forRoot(), NoopAnimationsModule]
            });
            fixture = TestBed.createComponent(TestSidebarComponent);
            context = fixture.componentInstance;
            spyOn(context, '_openStart');
            spyOn(context, '_opened');
            spyOn(context, '_closeStart');
            spyOn(context, '_closed');
            el = fixture.nativeElement;
            fixture.detectChanges();
            tick();
        }));

        it('should default values', () => {
            const sidebarEl = el.querySelector('.weui-sidebar') as HTMLElement;
            const classs = sidebarEl.classList;
            expect(classs).toContain('weui-sidebar__closed');
            expect(classs).toContain('weui-sidebar__left');
            expect(classs).toContain('weui-sidebar__slide');
            expect(sidebarEl.style.transform).toBe('translateX(-100%)');
        });

        it('should set mode="over"', () => {
            context.mode = 'over';
            fixture.detectChanges();
            expect(el.querySelector('.weui-sidebar').classList).toContain('weui-sidebar__over');
        });

        for (let pos of ['left', 'right', 'top', 'bottom']) {
            it(`should set position="${pos}"`, () => {
                context.position = pos;
                fixture.detectChanges();
                expect(el.querySelector('.weui-sidebar').classList).toContain(`weui-sidebar__${pos}`);
            });
        }

        it('should set ariaLabel', () => {
            const str: string = 'value';
            context.ariaLabel = str;
            fixture.detectChanges();
            expect(el.querySelector('.weui-sidebar').attributes['aria-label'].value).toBe(str);
        });

        it('should be opened and status=true', fakeAsync(() => {
            context.status = true;
            fixture.detectChanges();
            expect(context.sidebar.status).toBe(true);
            expect(el.querySelector('.weui-mask')).not.toBeNull();
        }));

        it('should be closed and status=false', fakeAsync(() => {
            context.status = true;
            fixture.detectChanges();
            context.sidebar.close();
            fixture.detectChanges();
            expect(context.sidebar.status).toBe(false);
        }));

        it('should emit opens event', fakeAsync(() => {
            context.status = true;
            fixture.detectChanges();
            expect(context._openStart).toHaveBeenCalled();
        }));

        it('should emit closes event', fakeAsync(() => {
            context.status = true;
            fixture.detectChanges();
            context.sidebar.close();
            fixture.detectChanges();
            expect(context._closeStart).toHaveBeenCalled();
        }));

    });

});

@Component({
    template: `
<weui-sidebar-container>
    <weui-sidebar #sidebar
        [(status)]="status"
        [mode]="mode"
        [position]="position"
        [backdrop]="backdrop"
        [sidebarClass]="sidebarClass"
        [ariaLabel]="ariaLabel"
        (openStart)="_openStart()"
        (opened)="_opened()"
        (closeStart)="_closeStart()"
        (closed)="_closed()">sidebar</weui-sidebar>
    content
</weui-sidebar-container>
    `
})
class TestSidebarComponent {

    @ViewChild('sidebar') sidebar: SidebarComponent;

    status: boolean = false;
    mode: string = 'slide';
    position: string = 'left';
    backdrop: boolean = true;
    sidebarClass: string = '';
    ariaLabel: string = '';

    _openStart() { }
    _opened() { }
    _closeStart() { }
    _closed() { }
}
