import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, EventEmitter, Output, HostListener, ElementRef } from '@angular/core';
import { PTRConfig } from "./ptr.config";

@Component({
    selector: 'weui-ptr, [weui-ptr]',
    template: `
        <div class="weui-ptr__loader" 
            [ngStyle]="{
                'height': config.height + 'px',
                'margin-top': -config.height + 'px'
            }">
            <div style="flex: 1 1 0%; padding: 5px;" *ngIf="config.icon">
                <span [innerHTML]="config.icon" class="weui-ptr__icon" style="display:inline-block"></span>
                {{loading ? config.loading : config.pull}}
                <p *ngIf="lastLabel">{{lastLabel}}</p>
            </div>
            <ng-content select="[loader]"></ng-content>
        </div>
        <div class="weui-ptr__content"><ng-content></ng-content></div>
    `,
    styles: [ 
        `weui-ptr{display:block;}weui-ptr .weui-icon-download{color:#999;}.weui-ptr{overflow:hidden}.weui-ptr__loader{pointer-events:none;font-weight:700;text-align:center;width:100%;overflow:hidden;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-line-pack:stretch;align-content:stretch}.weui-ptr__content{height:100%;overflow:scroll}`
    ],
    host: {
        '[class.weui-ptr]': 'true'
    },
    encapsulation: ViewEncapsulation.None
})
export class PTRComponent implements OnChanges {

    private ogY: number = 0;
    private loaderEl: any;
    private iconEl: any;
    private loading: boolean = false;
    private moving: boolean = false;

    lastLabel: string;
    @Input() config: PTRConfig;
    @Output() refresh = new EventEmitter();

    constructor(private el: ElementRef, private DEF: PTRConfig) {}

    /** 设置最后更新标签（支持HTML） */
    setLastUpdatedLabel(label: string) {
        this.lastLabel = label;
    }

    /** 设置刷新成功 */
    setFinished(lastUpdatedLabel?: string) {
        if (!this.moving) {
            this.loaderEl.style.transition = `margin-top .3s ease`;
            setTimeout(() => {
                this.loading = false;
                this.loaderEl.style.transition = `none`;
                if (lastUpdatedLabel) this.setLastUpdatedLabel(lastUpdatedLabel);
            }, 350);
        }
        this.setPos(0);
    }

    private setPos(v: number) {
        this.loaderEl.style.marginTop = `-${this.config.height - v}px`;
        if (this.iconEl) {
            this.iconEl.style.transform = `rotate(-${v <= this.config.height ? v * 1.8 : 0}deg)`;
        }
    }

    @HostListener('touchstart', [ '$event' ])
    onTouchStart($event: any) {
        if (this.loading) return;
        this.moving = true;
        this.ogY = ($event.touches[0] || $event.changedTouches[0]).pageY;
    }

    @HostListener('touchmove', [ '$event' ])
    onTouchMove($event: any) {
        if (this.loading) return;
        $event.preventDefault();
        const touch = $event.touches[0] || $event.changedTouches[0];
        let diffY = Math.abs(this.ogY - touch.pageY);
        this.setPos(diffY > this.config.height ? this.config.height : diffY);
    }

    @HostListener('touchend', [ '$event' ])
    @HostListener('touchcancel', ['$event'])
    onTouchEnd($event: any) {
        if (this.loading) return;
        const touch = $event.touches[0] || $event.changedTouches[0];
        let newY = Math.abs(this.ogY - touch.pageY);
        this.moving = false;
        if (newY < this.config.treshold) {
            this.setPos(0);
            return;
        }
        this.loading = true;
        // 允许刷新
        this.setPos(this.config.height);
        this.refresh.emit(this);
    }

    ngOnInit() {
        this.parseConfig();
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
