import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';

import { InfiniteLoaderConfig } from './infiniteloader.config';

@Component({
  selector: 'weui-infiniteloader',
  template: `
        <div class="weui-infiniteloader__content">
            <ng-content></ng-content>
            <div *ngIf="_loading || _finished">
                <div *ngIf="_loading" [innerHTML]="config.loading"></div>
                <div *ngIf="_finished" [innerHTML]="config.finished"></div>
            </div>
        </div>
    `,
  host: {
    '[class.weui-infiniteloader]': 'true',
    '[style.height]': 'config.height',
  },
})
export class InfiniteLoaderComponent implements OnChanges, OnInit, OnDestroy {
  private didScroll = false;
  private scrollEvent: any = null;
  private scrollTime: any = null;
  private disposeScroller: Subscription;

  _loading: boolean = false;
  _finished: boolean = false;

  /**
   * 配置项
   */
  @Input() config: InfiniteLoaderConfig;

  /**
   * 加载更多回调
   */
  @Output() loadmore = new EventEmitter<InfiniteLoaderComponent>();

  constructor(
    private el: ElementRef,
    private DEF: InfiniteLoaderConfig,
  ) { }

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
    const scrollPercent = Math.floor(
      (target.scrollTop + target.clientHeight) / target.scrollHeight * 100,
    );

    if (scrollPercent > this.config.percent) {
      this._loading = true;
      this.loadmore.emit(this);
    }
  }

  ngOnInit() {
    this.parseConfig();

    this.scrollTime = setInterval(() => {
      if (this.didScroll) {
        this.didScroll = false;
        this._onScroll();
      }
    }, this.config.throttle);

    this.disposeScroller = fromEvent(
      this.el.nativeElement.querySelector('.weui-infiniteloader__content'),
      'scroll',
    ).subscribe(($event: any) => {
      this.scrollEvent = $event;
      this.didScroll = true;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) this.parseConfig();
  }

  ngOnDestroy(): void {
    if (this.scrollTime) clearTimeout(this.scrollTime);
    if (this.disposeScroller) this.disposeScroller.unsubscribe();
  }

  private parseConfig() {
    this.config = Object.assign({}, this.DEF, this.config);
  }
}
