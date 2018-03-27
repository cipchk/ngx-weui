import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'example-swiper',
    templateUrl: './swiper.component.html',
    styleUrls: ['./swiper.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoSwiperComponent {
    log: string = '';
    options: any = {
        onInit: () => {
            setTimeout(() => { this.log = '初始化完成'; });
        },
        onSlideChangeEnd: (swiper: any) => {
            setTimeout(() => { this.log = `移动至第 ${swiper.realIndex + 1} 张`; });
        }
    };
    images: any[] = [
        { url: './assets/images/swiper-1.png', title: '标题1' },
        { url: './assets/images/swiper-2.png', title: '标题2' },
        { url: './assets/images/swiper-3.png', title: '标题3' }
    ];
} 
