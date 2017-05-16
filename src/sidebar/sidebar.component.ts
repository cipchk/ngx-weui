import { Component, Input, EventEmitter, Output, ElementRef, ViewEncapsulation, ViewChild, SimpleChanges, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';
import { findParent } from "../utils/dom";
import { SidebarConfig, PositionType, ModeType } from "./sidebar.config";
import { SidebarService } from './sidebar.service';
import { isIOS } from "../utils/browser";

/**
 * 侧边栏
 */
@Component({
    selector: 'weui-sidebar',
    template: `
    <aside #sidebar
      role="complementary"
      [attr.aria-hidden]="!status"
      [attr.aria-label]="ariaLabel"
      class="weui-sidebar weui-sidebar__{{status ? 'opened' : 'closed'}} weui-sidebar__{{position}} weui-sidebar__{{mode}}"
      [class.weui-sidebar__inert]="!status"
      [ngClass]="sidebarClass"
      [ngStyle]="_getStyle()">
      <ng-content></ng-content>
    </aside>
    `,
    styles: [`
.weui-sidebar{background-color:#fff;overflow:auto;pointer-events:auto;position:fixed;will-change:initial;z-index:99999999;-webkit-transition:-webkit-transform .3s cubic-bezier(0, 0, .3, 1);transition:-webkit-transform .3s cubic-bezier(0, 0, .3, 1);transition:transform .3s cubic-bezier(0, 0, .3, 1);transition:transform .3s cubic-bezier(0, 0, .3, 1), -webkit-transform .3s cubic-bezier(0, 0, .3, 1)}.weui-sidebar__left{bottom:0;left:0;top:0}.weui-sidebar__right{bottom:0;right:0;top:0}.weui-sidebar__top{left:0;right:0;top:0}.weui-sidebar__bottom{bottom:0;left:0;right:0}.weui-sidebar__inert{pointer-events:none;will-change:transform}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnChanges, OnDestroy {
    /**
     * 状态，true表示打开，false表示关闭
     * 
     * @type {boolean}
     */
    @Input() status: boolean = false;
    @Output() statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * 位置方向
     * 
     * @type {PositionType}
     * @default left
     */
    @Input() position: PositionType = 'left';

    /**
     * 类型
     * over: 不覆盖
     * slide：侧边移动
     * 
     * @type {ModeType}
     * @default slide
     */
    @Input() mode: ModeType = 'slide';

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default true
     */
    @Input() backdrop: boolean = true;
    /**
     * 自定义CLSS
     * 
     * @type {string}
     */
    @Input() sidebarClass: string;
    /**
     * 辅助设备标识
     * 
     * @type {string}
     */
    @Input() ariaLabel: string;

    /** 打开前回调 */
    @Output() openStart: EventEmitter<null> = new EventEmitter<null>();
    /** 打开后回调 */
    @Output() opened: EventEmitter<null> = new EventEmitter<null>();
    /** 关闭前回调 */
    @Output() closeStart: EventEmitter<null> = new EventEmitter<null>();
    /** 关闭后回调 */
    @Output() closed: EventEmitter<null> = new EventEmitter<null>();
    /** 模式变更通知 */
    @Output() modeChange: EventEmitter<string> = new EventEmitter<string>();
    /** 位置变更通知 */
    @Output() positionChange: EventEmitter<string> = new EventEmitter<string>();

    @Output() _rerender: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('sidebar') _elSidebar: ElementRef;

    private _openSub: Subscription;
    private _closeSub: Subscription;
    private _clickEvent: string = 'click';
    private _onClickOutsideAttached: boolean = false;

    constructor(private _sidebarService: SidebarService, config: SidebarConfig) {
        Object.assign(this, config);
        
        if (isIOS() && 'ontouchstart' in window) {
            this._clickEvent = 'touchstart';
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

        this._onTransitionEnd = this._onTransitionEnd.bind(this);
        this._onClickOutside = this._onClickOutside.bind(this);

        this._openSub = this._sidebarService.onOpen(this.open);
        this._closeSub = this._sidebarService.onClose(this.close);
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges): void {
        if ('status' in changes) {
            if (changes['status'].currentValue) {
                this.open();
            } else {
                this.close();
            }
        }
        if ('mode' in changes) {
            this.modeChange.emit(changes['mode'].currentValue);
        }
        if ('position' in changes) {
            this.positionChange.emit(changes['position'].currentValue);
        }
        if ('backdrop' in changes) {
            this._initCloseListeners();
        }
    }

    ngOnDestroy() {
        this._destroyCloseListeners();

        if (this._openSub) {
            this._openSub.unsubscribe();
        }
        if (this._closeSub) {
            this._closeSub.unsubscribe();
        }
    }

    /** 打开侧边栏 */
    open() {
        this.status = true;
        this.statusChange.emit(true);

        this.openStart.emit();

        this._elSidebar.nativeElement.addEventListener('transitionend', this._onTransitionEnd);
    }

    /** 关闭侧边栏 */
    close() {
        this.status = false;
        this.statusChange.emit(false);

        this.closeStart.emit();

        this._elSidebar.nativeElement.addEventListener('transitionend', this._onTransitionEnd);
    }

    /** 手动触发容器的重新渲染 */
    _triggerRerender() {
        this._rerender.emit();
    }

    _getStyle(): CSSStyleDeclaration {
        let transformStyle: string = 'none';
        let marginStyle = {};
        const isSlideMode: boolean = this.mode === 'slide';

        if (!this.status || isSlideMode) {
            transformStyle = `translate${(this.position === 'left' || this.position === 'right') ? 'X' : 'Y'}`;
            const isLeftOrTop: boolean = this.position === 'left' || this.position === 'top';
            const translateAmt: string = `${isLeftOrTop ? '-' : ''}100%`;
            transformStyle += `(${translateAmt})`;
        }

        return Object.assign(marginStyle, {
            webkitTransform: transformStyle,
            transform: transformStyle
        }) as CSSStyleDeclaration;
    }

    _onTransitionEnd(e: TransitionEvent) {
        if (e.target === this._elSidebar.nativeElement && e.propertyName.endsWith('transform')) {
            if (this.status) {
                this._initCloseListeners();
                this.opened.emit();
            } else {
                this._destroyCloseListeners();
                this.closed.emit();
            }

            this._elSidebar.nativeElement.removeEventListener('transitionend', this._onTransitionEnd);
        }
    }

    private _initCloseListeners(): void {
        if (this.status && this.backdrop) {
            setTimeout(() => {
                if (this.backdrop && !this._onClickOutsideAttached) {
                    document.addEventListener(this._clickEvent, this._onClickOutside);
                    this._onClickOutsideAttached = true;
                }
            });
        }
    }

    private _destroyCloseListeners() {
        if (this._onClickOutsideAttached) {
            document.removeEventListener(this._clickEvent, this._onClickOutside);
            this._onClickOutsideAttached = false;
        }
    }

    private _onClickOutside(e: MouseEvent) {
        if (this._onClickOutsideAttached && this._elSidebar && !this._elSidebar.nativeElement.contains(e.target)) {
            this.close();
        }
    }

    /** 获取侧边栏容器高度 */
    get _height(): number {
        return this._elSidebar.nativeElement ? this._elSidebar.nativeElement.offsetHeight : 0;
    }

    /** 获取侧边栏容器宽度 */
    get _width(): number {
        return this._elSidebar.nativeElement ? this._elSidebar.nativeElement.offsetWidth : 0;
    }
}
