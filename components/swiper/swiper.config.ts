import { Injectable } from '@angular/core';

@Injectable()
export class SwiperConfig {
  /**
   * 等同于swiper[参数项](http://idangero.us/swiper/api/)
   */
  options: any = {
    loop: true,
    pagination: '.swiper-pagination',
  };
}
