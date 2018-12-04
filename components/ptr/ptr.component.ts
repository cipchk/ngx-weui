import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
  OnInit,
} from '@angular/core';
import { PTRConfig } from './ptr.config';

@Component({
  selector: 'weui-ptr',
  template: `
  <div class="weui-ptr__loader"
    [ngStyle]="{
      'height.px': config.height,
      'margin-top.px': -config.height + (_pullPercent / (100 / config.height)),
      'transition': _animating ? 'all .5s' : 'none'
    }">
    <div style="flex: 1 1 0%; padding: 5px;" *ngIf="!config.customIcon">
      <span [innerHTML]="_pullPercent !== 100 ? config.pullIcon : loading ? config.loadingIcon : config.successIcon" class="weui-ptr__icon" style="display:inline-block"
        [ngStyle]="{
          'transform': 'rotate(' + -(_pullPercent !== 100 ? _pullPercent * 1.8 : 0) + 'deg)',
          'color': _pullPercent !== 100 ? '#5f5f5f' : '#1AAD19'
        }"></span>
      <p *ngIf="_lastLabel" class="weui-ptr__label">{{_lastLabel}}</p>
    </div>
    <ng-content select="[loader]"></ng-content>
  </div>
  <div class="weui-ptr__content"><ng-content></ng-content></div>
  `,
  host: {
    '[class.weui-ptr]': 'true',
  },
})
export class PTRComponent implements OnInit, OnChanges {
  private ogY: number = 0;
  private loading: boolean = false;
  private touching: boolean = false;
  private touchId: any;
  _animating: boolean = false;
  private initScrollTop: number = 0;
  _pullPercent: number = 0;
  private loaderEl: HTMLElement;
  private iconEl: HTMLElement;
  private contentEl: HTMLElement;

  _lastLabel: string;
  /** 配置项 */
  @Input() config: PTRConfig;
  /** 是否禁止 */
  @Input() disabled: boolean = false;
  /** 下拉滚动时回调，返回一个0-100%的参数 */
  @Output() scroll = new EventEmitter<number>();
  /** 刷新回调 */
  @Output() refresh = new EventEmitter<PTRComponent>();

  constructor(private el: ElementRef, private DEF: PTRConfig) { }

  /**
   * 设置最后更新标签
   *
   * @param label 标签内容（支持HTML）
   */
  setLastUpdatedLabel(label: string) {
    this._lastLabel = label;
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

    if (!this.touching) {
      setTimeout(() => {
        this._animating = false;
        if (lastUpdatedLabel) this.setLastUpdatedLabel(lastUpdatedLabel);
      }, 350);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart($event: any) {
    if (this.disabled || this.touching || this.loading) return;
    this.touching = true;
    this.touchId = $event.targetTouches[0].identifier;
    this.ogY =
      this._pullPercent === 0
        ? $event.targetTouches[0].pageY
        : $event.targetTouches[0].pageY - this._pullPercent;
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
    this._pullPercent =
      diffY - this.initScrollTop > 100 ? 100 : diffY - this.initScrollTop;
    this.scroll.emit(this._pullPercent);
  }

  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onTouchEnd($event: any) {
    if (this.disabled || !this.touching || this.loading) return;

    let _pullPercent = this._pullPercent;
    let loading = false;
    if (_pullPercent >= this.config.treshold) {
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
  }

  ngOnInit() {
    this.parseConfig();
    this.contentEl = this.el.nativeElement.querySelector('.weui-ptr__content');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) this.parseConfig();
  }

  private parseConfig() {
    this.config = Object.assign({}, this.DEF, this.config);
    const el = this.el.nativeElement;
    this.loaderEl = el.querySelector('.weui-ptr__loader');
    this.iconEl = el.querySelector('.weui-ptr__icon');
  }
}
