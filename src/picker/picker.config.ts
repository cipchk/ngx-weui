import { Injectable } from '@angular/core';

@Injectable()
export class PickerConfig {
    /**
     * 取消按钮文本
     * 
     * @type {string}
     * @default 取消
     */
    cancel?: string = '取消';

    /**
     * 确定按钮文本
     * 
     * @type {string}
     * @default 确定
     */
    confirm?: string = '确定';

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default true
     */
    backdrop?: boolean = true;
}
