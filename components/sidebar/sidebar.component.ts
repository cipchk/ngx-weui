import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { isIOS } from 'ngx-weui/core';
import { Subscription } from 'rxjs';
import { ModeType, PositionType, SidebarConfig } from './sidebar.config';
import { SidebarService } from './sidebar.service';

/**
 * 侧边栏
 */
@Component({
  selector: 'weui-sidebar',
  template: `
    <aside
      #sidebar
      role="complementary"
      [attr.aria-hidden]="!status"
      [attr.aria-label]="ariaLabel"
      class="weui-sidebar weui-sidebar__{{ status ? 'opened' : 'closed' }} weui-sidebar__{{ position }} weui-sidebar__{{
        mode
      }}"
      [class.weui-sidebar__inert]="!status"
      [ngClass]="sidebarClass"
      [ngStyle]="_getStyle()"
    >
      <ng-content></ng-content>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnChanges, OnDestroy {
  /**
   * 状态，true表示打开，false表示关闭
   */
  @Input() status: boolean = false;
  @Output() readonly statusChange = new EventEmitter<boolean>();
  /**
   * 位置方向，默认：`left`
   */
  @Input() position: PositionType = 'left';

  /**
   * 类型，默认：`slide`
   * - over: 不覆盖
   * - slide：侧边移动
   */
  @Input() mode: ModeType = 'slide';

  /**
   * 允许点击背景关闭，默认：`true`
   */
  @Input() backdrop: boolean = true;
  /**
   * 自定义CLSS
   */
  @Input() sidebarClass: string;
  /**
   * 辅助设备标识
   */
  @Input() ariaLabel: string;

  /** 打开前回调 */
  @Output() readonly openStart = new EventEmitter<null>();
  /** 打开后回调 */
  @Output() readonly opened = new EventEmitter<null>();
  /** 关闭前回调 */
  @Output() readonly closeStart = new EventEmitter<null>();
  /** 关闭后回调 */
  @Output() readonly closed = new EventEmitter<null>();
  /** 模式变更通知 */
  @Output() readonly modeChange = new EventEmitter<string>();
  /** 位置变更通知 */
  @Output() readonly positionChange = new EventEmitter<string>();

  @Output() readonly _rerender = new EventEmitter<null>();

  @ViewChild('sidebar') _elSidebar: ElementRef;

  private _openSub: Subscription;
  private _closeSub: Subscription;
  private _clickEvent: string = 'click';
  private _onClickOutsideAttached: boolean = false;
  private _anting = false;

  constructor(private _sidebarService: SidebarService, config: SidebarConfig, @Inject(DOCUMENT) private doc: any) {
    Object.assign(this, config);

    if (isIOS() && 'ontouchstart' in window) {
      this._clickEvent = 'touchstart';
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this._onClickOutside = this._onClickOutside.bind(this);

    this._openSub = this._sidebarService.onOpen(this.open);
    this._closeSub = this._sidebarService.onClose(this.close);
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.status && !this._anting) {
      if (changes.status.currentValue) {
        this.open();
      } else {
        this.close();
      }
      if (changes.status.firstChange) this._anting = false;
    }
    if (changes.mode) {
      this.modeChange.emit(changes.mode.currentValue);
    }
    if (changes.position) {
      this.positionChange.emit(changes.position.currentValue);
    }
    if (changes.backdrop) {
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
    this._anting = true;
    this.status = true;
    this.statusChange.emit(true);

    this.openStart.emit();

    this.closeAnt();
  }

  /** 关闭侧边栏 */
  close() {
    this._anting = true;
    this.status = false;
    this.statusChange.emit(false);

    this.closeStart.emit();

    this.closeAnt();
  }

  /** 手动触发容器的重新渲染 */
  _triggerRerender() {
    this._rerender.emit();
  }

  _getStyle(): CSSStyleDeclaration {
    let transformStyle = 'none';
    const marginStyle = {};
    const isSlideMode: boolean = this.mode === 'slide';

    if (!this.status || isSlideMode) {
      transformStyle = `translate${this.position === 'left' || this.position === 'right' ? 'X' : 'Y'}`;
      const isLeftOrTop: boolean = this.position === 'left' || this.position === 'top';
      const translateAmt = `${isLeftOrTop ? '-' : ''}100%`;
      transformStyle += `(${translateAmt})`;
    }

    return { ...marginStyle, webkitTransform: transformStyle, transform: transformStyle } as CSSStyleDeclaration;
  }

  private closeAnt() {
    setTimeout(() => {
      this._anting = false;
      if (this.status) {
        this._initCloseListeners();
        this.opened.emit();
      } else {
        this._destroyCloseListeners();
        this.closed.emit();
      }
    }, 300);
  }

  private _initCloseListeners(): void {
    if (this.status && this.backdrop) {
      setTimeout(() => {
        if (this.backdrop && !this._onClickOutsideAttached) {
          this.doc.addEventListener(this._clickEvent, this._onClickOutside, false);
          this._onClickOutsideAttached = true;
        }
      });
    }
  }

  private _destroyCloseListeners() {
    if (this._onClickOutsideAttached) {
      this.doc.removeEventListener(this._clickEvent, this._onClickOutside, false);
      this._onClickOutsideAttached = false;
    }
  }

  private _onClickOutside(e: Event): void {
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
