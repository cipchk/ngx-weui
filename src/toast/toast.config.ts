import { Injectable } from '@angular/core';

// tslint:disable-next-line:interface-over-type-literal
export type ToastConfigType = { text: string, icon: string, time: number };

@Injectable()
export class ToastConfig {

    /**
     * 成功配置项
     * @type {ToastConfigType}
     */
    success?: ToastConfigType = { text: '已完成', icon: 'weui-icon-success-no-circle', time: 2000 };

    /**
     * 加载中配置项
     * @type {ToastConfigType}
     */
    loading?: ToastConfigType = { text: '加载中…', icon: 'weui-loading', time: 2000 };

}
