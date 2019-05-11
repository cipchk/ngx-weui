import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from 'ngx-weui/core';
import { PTRConfig } from './ptr.config';

@Component({
  selector: 'weui-ptr',
  exportAs: 'weuiPtr',
  templateUrl: './ptr.component.html',
  host: {
    '[class.weui-ptr]': 'true',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PTRComponent implements OnInit, OnChanges {
  private ogY: number = 0;
  private loading: boolean = false;
  private touching: boolean = false;
  private touchId: any;
  private initScrollTop: number = 0;
  private contentEl: HTMLElement;
  _animating: boolean = false;
  _pullPercent: number = 0;
  _lastLabel: string;
  /** 配置项 */
  @Input() config: PTRConfig;
  /** 是否禁止 */
  @Input() @InputBoolean() disabled: boolean = false;
  /** 下拉滚动时回调，返回一个0-100%的参数 */
  @Output() readonly scroll = new EventEmitter<number>();
  /** 刷新回调 */
  @Output() readonly refresh = new EventEmitter<PTRComponent>();

  constructor(private el: ElementRef, private DEF: PTRConfig, private cdr: ChangeDetectorRef) {}

  /**
   * 设置最后更新标签
   *
   * @param label 标签内容（支持HTML）
   */
  setLastUpdatedLabel(label: string) {
    this._lastLabel = label;
    this.cdr.detectChanges();
  }

  /**
   * 设置刷新成功
   *
   * @param [lastUpdatedLabel] label 标签内容（支持HTML）
   */
  setFinished(lastUpdatedLabel?: string) {
    this._pullPercent = 0;
    this.loading = false;
    this._animating = true;
    this.cdr.detectChanges();

    if (!this.touching) {
      setTimeout(() => {
        this._animating = false;
        if (lastUpdatedLabel) this.setLastUpdatedLabel(lastUpdatedLabel);
        this.cdr.detectChanges();
      }, 350);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart($event: any) {
    if (this.disabled || this.touching || this.loading) return;
    this.touching = true;
    this.touchId = $event.targetTouches[0].identifier;
    this.ogY =
      this._pullPercent === 0 ? $event.targetTouches[0].pageY : $event.targetTouches[0].pageY - this._pullPercent;
    this.initScrollTop = this.contentEl.scrollTop;
    this._animating = false;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove($event: any) {
    if (this.disabled || !this.touching || this.loading) return;
    if ($event.targetTouches[0].identifier !== this.touchId) return;

    const pageY = $event.targetTouches[0].pageY;
    const diffY = pageY - this.ogY;
    // if it's scroll
    if (diffY < 0) return;
    // if it's not at top
    if (this.contentEl.scrollTop > 0) return;

    $event.preventDefault();

    // let diffY = Math.abs(this.ogY - pageY);
    this._pullPercent = diffY - this.initScrollTop > 100 ? 100 : diffY - this.initScrollTop;
    this.scroll.emit(this._pullPercent);
  }

  @HostListener('touchend')
  @HostListener('touchcancel')
  onTouchEnd() {
    if (this.disabled || !this.touching || this.loading) return;

    let _pullPercent = this._pullPercent;
    let loading = false;
    if (_pullPercent >= this.config.treshold!) {
      loading = true;
    } else {
      _pullPercent = 0;
    }

    this.touching = false;
    this.ogY = 0;
    this.touchId = undefined;
    this.initScrollTop = 0;
    this._animating = loading;
    this._pullPercent = _pullPercent;
    this.loading = loading;
    if (loading) this.refresh.emit(this);
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.parseConfig();
    this.contentEl = this.el.nativeElement.querySelector('.weui-ptr__content');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) this.parseConfig();
  }

  private parseConfig() {
    this.config = { ...this.DEF, ...this.config };
  }
}
