import { Component, AfterContentInit, OnChanges, OnDestroy, SimpleChanges, ViewEncapsulation, ChangeDetectionStrategy, QueryList, ContentChildren, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

/**
 * 侧边栏容器
 */
@Component({
    selector: 'weui-sidebar-container',
    template: `
        <ng-content select="weui-sidebar"></ng-content>
        <div *ngIf="_showBackdrop" aria-hidden="true" class="weui-mask" (click)="_onBackdropClicked($event)"></div>
        <div class="weui-sidebar__content" [ngStyle]="_getStyles()">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
weui-sidebar-container {
    box-sizing: border-box;
    display: block;
    height: 100%;
    position: relative;
    transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);
}

.weui-sidebar__content {
    display: block;
    height: 100%;
    overflow: auto;
    transition: margin 0.3s cubic-bezier(0, 0, 0.3, 1);
}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SidebarContainerComponent implements AfterContentInit, OnChanges, OnDestroy {
    @ContentChildren(SidebarComponent)
    _sidebars: QueryList<SidebarComponent>;

    @Input() _showBackdrop: boolean = false;
    @Output() _showBackdropChange = new EventEmitter<boolean>();

    constructor(
        private _ref: ChangeDetectorRef,
        private _el: ElementRef) { }

    ngAfterContentInit(): void {
        this._onToggle();
        this._subscribe();

        this._sidebars.changes.subscribe(() => {
            this._unsubscribe();
            this._subscribe();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('_showBackdrop' in changes) {
            this._showBackdropChange.emit(changes['_showBackdrop'].currentValue);
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe();
    }

    _getStyles(): CSSStyleDeclaration {
        let left = 0,
            right = 0,
            top = 0,
            bottom = 0;

        if (this._sidebars) {
            this._sidebars.forEach((sidebar: SidebarComponent) => {
                if (!sidebar) { return; }

                if (sidebar.mode === 'slide') {
                    let transformStyle = null;

                    if (sidebar.status) {
                        const isLeftOrTop: boolean = sidebar.position === 'left' || sidebar.position === 'top';
                        const isLeftOrRight: boolean = sidebar.position === 'left' || sidebar.position === 'right';

                        const transformDir: string = isLeftOrRight ? 'X' : 'Y';
                        const transformAmt: string = `${isLeftOrTop ? '' : '-'}${isLeftOrRight ? sidebar._width : sidebar._height}`;

                        transformStyle = `translate${transformDir}(${transformAmt}px)`;
                    }

                    this._el.nativeElement.style.transform = transformStyle;
                }
            });
        }

        return {
            margin: `${top}px ${right}px ${bottom}px ${left}px`
        } as CSSStyleDeclaration;
    }

    _onBackdropClicked($event: any) {
        $event.preventDefault();
        $event.stopPropagation();
        this._sidebars.forEach((sidebar: SidebarComponent) => {
            if (sidebar.status && sidebar.backdrop) {
                sidebar.close();
            }
        });
    }

    private _subscribe() {
        if (this._sidebars) {
            this._sidebars.forEach((sidebar: SidebarComponent) => {
                if (!sidebar) { return; }

                sidebar.openStart.subscribe(() => this._onToggle());
                sidebar.opened.subscribe(() => this._markForCheck());

                sidebar.closeStart.subscribe(() => this._onToggle());
                sidebar.closed.subscribe(() => this._markForCheck());

                sidebar.modeChange.subscribe(() => this._markForCheck());
                sidebar.positionChange.subscribe(() => this._markForCheck());

                sidebar._rerender.subscribe(() => this._markForCheck());
            });
        }
    }

    private _unsubscribe() {
        if (this._sidebars) {
            this._sidebars.forEach((sidebar: SidebarComponent) => {
                if (!sidebar) { return; }

                sidebar.openStart.unsubscribe();
                sidebar.opened.unsubscribe();

                sidebar.closeStart.unsubscribe();
                sidebar.closed.unsubscribe();

                sidebar.modeChange.unsubscribe();
                sidebar.positionChange.unsubscribe();

                sidebar._rerender.unsubscribe();
            });
        }
    }

    /** 状态变更时重新计算样式 */
    private _markForCheck() {
        this._ref.markForCheck();
    }

    private _onToggle() {
        if (this._sidebars) {
            let hasOpen = false;

            const _sidebars = this._sidebars.toArray();
            for (let i = 0; i < _sidebars.length; i++) {
                const sidebar: SidebarComponent = _sidebars[i];

                if (sidebar.status) {
                    hasOpen = true;
                    break;
                }
            }

            this._showBackdrop = hasOpen;
            this._showBackdropChange.emit(hasOpen);
        }

        this._markForCheck();
    }
}
