import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { InfiniteLoaderConfig } from './infiniteloader.config';

@Component({
  selector: 'weui-infiniteloader',
  exportAs: 'weuiInfiniteloader',
  templateUrl: './infiniteloader.component.html',
  host: {
    '[class.weui-infiniteloader]': 'true',
    '[style.height]': 'config.height',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InfiniteLoaderComponent implements OnInit, OnDestroy {
  private didScroll = false;
  private scrollEvent: Event | null = null;
  private scrollTime: any = null;
  private disposeScroller: Subscription;

  _loading = false;
  _finished = false;
  _restart = false;

  private _config: InfiniteLoaderConfig;

  @Output() readonly loadmore = new EventEmitter<InfiniteLoaderComponent>();

  @Input()
  set config(val: InfiniteLoaderConfig) {
    this._config = { ...this.DEF, ...val };
  }
  get config(): InfiniteLoaderConfig {
    return this._config;
  }

  constructor(private el: ElementRef<HTMLElement>, private DEF: InfiniteLoaderConfig, private cdr: ChangeDetectorRef) {
    this.config = { ...DEF };
  }

  /** 设置本次加载完成 */
  resolveLoading(): void {
    this._loading = false;
    this._finished = false;
    this.cdr.detectChanges();
  }

  /** 设置结束 */
  setFinished(): void {
    this._loading = false;
    this._finished = true;
    this.cdr.detectChanges();
  }

  /** 设置重新开始 */
  restart(): void {
    this._finished = false;
    this._restart = true;
    this.cdr.detectChanges();
  }

  /**
   * 触发滚动
   */
  scroll(): void {
    if (!this.scrollEvent || this._loading || this._finished) {
      return;
    }
    const target = this.scrollEvent.target as HTMLElement;
    if (this._restart) {
      target.scrollTop = 0;
      this._restart = false;
    }
    const scrollPercent = Math.floor(((target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);

    if (scrollPercent > this.config.percent!) {
      this._loading = true;
      this.loadmore.emit(this);
      this.cdr.detectChanges();
    }
  }

  ngOnInit(): void {
    this.scrollTime = setInterval(() => {
      if (this.didScroll) {
        this.didScroll = false;
        this.scroll();
      }
    }, this.config.throttle);

    this.disposeScroller = fromEvent(this.el.nativeElement.querySelector('.weui-infiniteloader__content')!, 'scroll').subscribe(
      ($event: Event) => {
        this.scrollEvent = $event;
        this.didScroll = true;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.scrollTime) {
      clearTimeout(this.scrollTime);
    }
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }
}
