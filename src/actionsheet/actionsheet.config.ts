import { Injectable } from '@angular/core';

@Injectable()
export class ActionSheetConfig {
    /**
     * 样式
     * 
     * @type {('ios' | 'android')}
     */
    skin?: 'ios' | 'android' = 'ios';

    /**
     * 标题
     * 
     * @type {string}
     */
    title?: string;

    /**
     * 取消
     * 
     * @type {string}
     */
    cancel?: string = '取消';
}
