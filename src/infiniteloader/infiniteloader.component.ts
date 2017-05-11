import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, EventEmitter, Output, HostListener, ElementRef, OnDestroy, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { InfiniteLoaderConfig } from "./infiniteloader.config";

@Component({
    selector: 'weui-infiniteloader, [weui-infiniteloader]',
    template: `
        <div class="weui-infiniteloader__content">
            <ng-content></ng-content>
            <div *ngIf="loading || finished">
                <div *ngIf="loading" [innerHTML]="config.loading"></div>
                <div *ngIf="finished" [innerHTML]="config.finished"></div>
            </div>
        </div>
    `,
    styles: [
       `.weui-infiniteloader{overflow:hidden}.weui-infiniteloader__content{height:100%;overflow:scroll;-webkit-overflow-scrolling:touch;z-index:1}`
    ],
    host: {
        '[class.weui-infiniteloader]': 'true',
        '[style.height]': 'config.height'
    },
    encapsulation: ViewEncapsulation.None
})
export class InfiniteLoaderComponent implements OnChanges, OnDestroy {
    loading: boolean = false;
    finished: boolean = false;

    lastLabel: string;
    @Input() config: InfiniteLoaderConfig;
    @Output() loadmore = new EventEmitter();

    constructor(private el: ElementRef,
        private zone: NgZone,
        private DEF: InfiniteLoaderConfig) { }

    /** 设置本次加载完成 */
    resolveLoading() {
        this.loading = false;
        this.finished = false;
    }

    /** 设置结束 */
    setFinished() {
        this.loading = false;
        this.finished = true;
    }

    onScroll($event: any) {
        if (this.loading || this.finished) return;
        const target = $event.target;
        const scrollPercent = Math.floor(((target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);

        if (scrollPercent > this.config.percent) {
            this.loading = true;
            this.loadmore.emit(this);
        }
    }

    private disposeScroller: Subscription;
    ngOnInit() {
        this.parseConfig();
        this.disposeScroller = Observable
                            .fromEvent(this.el.nativeElement.querySelector('.weui-infiniteloader__content'), 'scroll')
                            .throttleTime(this.config.throttle)
                            .subscribe(($event: any) => {
                                this.onScroll($event);
                            });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('config' in changes) this.parseConfig();
    }

    ngOnDestroy(): void {
        if (this.disposeScroller) this.disposeScroller.unsubscribe();
    }

    private parseConfig() {
        this.config = Object.assign({}, this.DEF, this.config);
    }
}
