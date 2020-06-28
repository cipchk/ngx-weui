import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperConfig } from './swiper.config';

declare const Swiper: any;

@Component({
  selector: 'weui-swiper',
  exportAs: 'weuiSwiper',
  template: ` <ng-content></ng-content> `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SwiperComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {
  private containerEl: HTMLElement;
  /**
   * 等同于swiper[参数项](http://idangero.us/swiper/api/)
   */
  @Input() options: any;

  /**
   * Swiper 实例对象，可以通过 `@ViewChild` 访问到它
   */
  swiper: any;

  constructor(private el: ElementRef, private zone: NgZone, private DEF: SwiperConfig) {}

  private initOptions(): void {
    this.options = { ...this.DEF.options, ...this.options };
  }

  private init(): void {
    this.destroy();

    this.zone.runOutsideAngular(() => {
      this.swiper = new Swiper(this.containerEl, this.options);
    });
  }

  private destroy(): void {
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

  ngOnInit(): void {
    if (!this.options) {
      this.initOptions();
    }
    this.containerEl = this.el.nativeElement.querySelector('.swiper-container');
    if (!this.containerEl) {
      throw new Error('组件内容的HTML跟swiper所需要的DOM结构必须完全一样。');
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (changes.options) {
      this.initOptions();
      if (!changes.options.firstChange) {
        this.init();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
