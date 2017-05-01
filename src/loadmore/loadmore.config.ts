import { Injectable } from '@angular/core';

@Injectable()
export class LoadmoreConfig {
    /**
     * 样式
     * 
     * @type {('loading' | 'line' | 'dot')}
     * @default loading
     */
    type?: 'loading' | 'line' | 'dot' = 'loading';

    /**
     * loading文本
     * 
     * @type {string}
     * @default 正在加载
     */
    loadingText?: string = '正在加载';

    /**
     * line文本
     * 
     * @type {string}
     * @default 暂无数据
     */
    lineText?: string = '暂无数据';
}
