import { Injectable } from '@angular/core';

export type ToastConfigType = { text: string, icon: string, time: number };

@Injectable()
export class ToastConfig {

    /**
     * 成功
     */
    success?: ToastConfigType = { text: '已完成', icon: 'weui-icon-success-no-circle', time: 2000 };

    /**
     * 加载中
     */
    loading?: ToastConfigType = { text: '加载中…', icon: 'weui-loading', time: 2000 };

}
