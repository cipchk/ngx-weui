import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  EventEmitter,
  Output,
  ElementRef,
  NgZone,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { SwiperConfig } from './swiper.config';

declare const Swiper: any;

@Component({
  selector: 'weui-swiper',
  template: `<ng-content></ng-content>`,
})
export class SwiperComponent
  implements AfterViewInit, OnChanges, OnInit, OnDestroy {
  /**
   * 等同于swiper[参数项](http://idangero.us/swiper/api/)
   */
  @Input() options: any;

  constructor(
    private el: ElementRef,
    private zone: NgZone,
    private DEF: SwiperConfig,
  ) {}

  /**
   * Swiper 实例对象，可以通过 `@ViewChild` 访问到它
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
      ['horizontal', 'vertical'].forEach(v => {
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
    if (!this.containerEl)
      throw new Error('组件内容的HTML跟swiper所需要的DOM结构必须完全一样。');
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
