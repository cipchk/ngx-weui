import { SwiperConfig } from './swiper.config';
import { Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, OnDestroy, EventEmitter, Output, ElementRef, NgZone } from '@angular/core';

declare const Swiper: any;

/**
 * Swiper触摸滑动
 * 
 * 只是[swiper](http://idangero.us/swiper/)的简单封装而已，默认 `ngx-weui` 并不强制依赖 `swiper`，所以如果你需要这个模块。
 * 还需要配置自行安装 swiper 插件：
 * 
 * ```bash
 * npm install swiper --save
 * ```
 * 
 * 当然，如果你想更好的编码体验，也可以选择安装一下swipe.d.ts
 * 
 * ```bash
 * npm install --save-dev @types/swiper
 * ```
 * 
 * 最后 .angular-cli.json 导入配置：
 * 
 * ```json
 * "styles": [
 *  "./node_modules/swiper/dist/css/swiper.css"
 * ],
 * "scripts": [
 *  "./node_modules/swiper/dist/js/swiper.js"
 * ]
 * ```
 * 
 * 使用示例：
 * 
 * ```html
 * <weui-swiper [options]="options">
 *  <div class="swiper-container">
 *      <div class="swiper-wrapper">
 *          <div class="swiper-slide" *ngFor="let i of [1, 2, 3, 4]">Slide {{i}}</div>
 *      </div>
 *      <div class="swiper-pagination"></div>
 *  </div>
 * </weui-swiper>
 * ```
 * 
 * 组件内容的HTML跟swiper所需要的DOM结构完全一样。
 */
@Component({
    selector: 'weui-swiper',
    template: `<ng-content></ng-content>`,
    styles: [ `:host {display:block; position: relative;}` ]
})
export class SwiperComponent implements OnChanges, OnDestroy {

    /**
     * 等同于swiper[参数项](http://idangero.us/swiper/api/)
     * 
     * @type {any}
     */
    @Input() options: any;

    constructor(private el: ElementRef, private zone: NgZone, private DEF: SwiperConfig) { }

    /**
     * Swiper 实例对象，可以通过 `@ViewChild` 访问到它
     * 
     * @type {Swiper}
     */
    swiper: any;

    private initOptions() {
        this.options = Object.assign({}, this.DEF.options, this.options);
    }

    private containerEl: HTMLElement;
    private init() {
        this.destroy();
        
        this.zone.runOutsideAngular(() => {
            this.swiper = new Swiper(this.containerEl, this.options);
        });
    }

    private destroy() {
        if (this.containerEl) {
            [ 'horizontal', 'vertical' ].forEach(v => {
                this.containerEl.classList.remove('swiper-container-' + v);
            });
        }
        if (this.swiper) {
            this.zone.runOutsideAngular(() => {
                this.swiper.destroy(true, false);
                this.swiper = null;
            });
        }
    }

    ngOnInit() {
        if (!this.options) this.initOptions();
        this.containerEl = this.el.nativeElement.querySelector('.swiper-container');
        if (!this.containerEl) throw new Error('组件内容的HTML跟swiper所需要的DOM结构必须完全一样。');
    }

    ngAfterViewInit() {
        this.init();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('options' in changes) {
            this.initOptions();
            if (!changes['options'].firstChange) {
                this.init();
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy();
    }
}
