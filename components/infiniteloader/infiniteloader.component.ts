import {
  ChangeDetectionStrategy,
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
  private scrollEvent: any = null;
  private scrollTime: any = null;
  private disposeScroller: Subscription;

  _loading: boolean = false;
  _finished: boolean = false;

  private _config: InfiniteLoaderConfig;
  @Input()
  set config(val: InfiniteLoaderConfig) {
    this._config = { ...this.DEF, ...val };
  }
  get config(): InfiniteLoaderConfig {
    return this._config;
  }

  @Output() readonly loadmore = new EventEmitter<InfiniteLoaderComponent>();

  constructor(private el: ElementRef<HTMLElement>, private DEF: InfiniteLoaderConfig) {
    this.config = { ...DEF };
  }

  /** 设置本次加载完成 */
  resolveLoading() {
    this._loading = false;
    this._finished = false;
  }

  /** 设置结束 */
  setFinished() {
    this._loading = false;
    this._finished = true;
  }

  /** 设置重新开始 */
  restart() {
    this._finished = false;
  }

  _onScroll() {
    if (this._loading || this._finished) return;
    const target = this.scrollEvent.target;
    const scrollPercent = Math.floor(((target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);

    if (scrollPercent > this.config.percent!) {
      this._loading = true;
      this.loadmore.emit(this);
    }
  }

  ngOnInit() {
    this.scrollTime = setInterval(() => {
      if (this.didScroll) {
        this.didScroll = false;
        this._onScroll();
      }
    }, this.config.throttle);

    this.disposeScroller = fromEvent(
      this.el.nativeElement.querySelector('.weui-infiniteloader__content')!,
      'scroll',
    ).subscribe(($event: any) => {
      this.scrollEvent = $event;
      this.didScroll = true;
    });
  }

  ngOnDestroy(): void {
    if (this.scrollTime) clearTimeout(this.scrollTime);
    if (this.disposeScroller) this.disposeScroller.unsubscribe();
  }
}
