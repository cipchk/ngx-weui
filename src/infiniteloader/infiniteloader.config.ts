import { Injectable } from '@angular/core';

@Injectable()
export class InfiniteLoaderConfig {
    /**
     * height for the container, use string like '10px', default for '100vh'
     * 
     * @type {string}
     */
    height?: string = '100vh';

    /**
     * 滚动至x%时触发加载，默认：75%
     * 
     * @type {number}
     * @default 75
     */
    percent?: number = 75;

    loading?: string = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中…</span></div>';

    finished?: string = '<div class="weui-loadmore weui-loadmore_line"><span class="weui-loadmore__tips">无数据</span></div>';

    /**滚动节流时长（单位：ms） */
    throttle?: number = 300;
}
