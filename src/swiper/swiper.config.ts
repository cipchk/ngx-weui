import { Injectable } from '@angular/core';

@Injectable()
export class SwiperConfig {
    
    /**
     * 等同于swiper[参数项](http://idangero.us/swiper/api/)
     * 
     * @type {any}
     */
    options: any = {
        loop: true,
        pagination: '.swiper-pagination'
    };
}
