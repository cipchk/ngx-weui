import { Injectable } from '@angular/core';

@Injectable()
export class PTRConfig {
    /**
     * 下拉显示文本
     * 
     * @type {string}
     */
    pull?: string = '';

    /**
     * 加载中显示文本
     * 
     * @type {string}
     */
    loading?: string = '';

    /**
     * icon代码，支持HTML
     * 
     * @type {string}
     */
    icon?: string = '<i class="weui-icon-download"></i>';

    /**
     * 下拉刷新容器高度（单位：px）
     * 
     * @type {number}
     */
    height?: number = 100;

    /**
     * 下拉范围有效
     * 
     * @type {number}
     */
    treshold?: number = 60;
}
