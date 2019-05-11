import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from 'ngx-weui/core';
import { SidebarComponent } from './sidebar.component';

/**
 * 侧边栏容器
 */
@Component({
  selector: 'weui-sidebar-container',
  exportAs: 'weuiSidebarContainer',
  templateUrl: './sidebar-container.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarContainerComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  @ContentChildren(SidebarComponent) _sidebars: QueryList<SidebarComponent>;

  @Input() @InputBoolean() _showBackdrop: boolean = false;
  @Output() readonly _showBackdropChange = new EventEmitter<boolean>();

  private orgOverflowX = '';

  private get body(): HTMLBodyElement {
    return document.querySelector('body')!;
  }

  constructor(private _ref: ChangeDetectorRef, private _el: ElementRef) {}

  ngAfterContentInit(): void {
    this._onToggle();
    this._subscribe();

    this._sidebars.changes.subscribe(() => {
      this._unsubscribe();
      this._subscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes._showBackdrop) {
      this._showBackdropChange.emit(changes._showBackdrop.currentValue);
    }
  }

  ngOnInit() {
    this.orgOverflowX = this.body.style.overflowX!;
    this.body.style.overflowX = 'hidden';
  }

  ngOnDestroy(): void {
    this._unsubscribe();
    this.body.style.overflowX = this.orgOverflowX;
  }

  _getStyles(): CSSStyleDeclaration {
    if (this._sidebars) {
      this._sidebars.forEach((sidebar: SidebarComponent) => {
        if (!sidebar) {
          return;
        }

        if (sidebar.mode === 'slide') {
          let transformStyle: string | null = null;

          if (sidebar.status) {
            const isLeftOrTop = sidebar.position === 'left' || sidebar.position === 'top';
            const isLeftOrRight = sidebar.position === 'left' || sidebar.position === 'right';

            const transformDir = isLeftOrRight ? 'X' : 'Y';
            const transformAmt = `${isLeftOrTop ? '' : '-'}${isLeftOrRight ? sidebar._width : sidebar._height}`;

            transformStyle = `translate${transformDir}(${transformAmt}px)`;
          }

          this._el.nativeElement.style.transform = transformStyle;
        }
      });
    }

    return {
      margin: `0px 0px 0px 0px`,
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
    return false;
  }

  private _subscribe() {
    if (this._sidebars) {
      this._sidebars.forEach((sidebar: SidebarComponent) => {
        if (!sidebar) {
          return;
        }

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
        if (!sidebar) {
          return;
        }

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
      // tslint:disable-next-line: prefer-for-of
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
