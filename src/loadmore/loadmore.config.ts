import { Injectable } from '@angular/core';

@Injectable()
export class LoadmoreConfig {
    /**
     * 类型
     * 
     * @type {('loading' | 'line' | 'dot')}
     * @default loading
     */
    type?: 'loading' | 'line' | 'dot' = 'loading';

    /**
     * 当type=='loading'时显示的文本
     * 
     * @type {string}
     * @default 正在加载
     */
    loadingText?: string = '正在加载';

    /**
     * 当type=='line'时显示的文本
     * 
     * @type {string}
     * @default 暂无数据
     */
    lineText?: string = '暂无数据';
}
