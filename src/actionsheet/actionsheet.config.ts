import { Injectable } from '@angular/core';
import { SkinType } from '../utils/types';

@Injectable()
export class ActionSheetConfig {
    /**
     * 样式
     *
     * @type {SkinType}
     */
    skin?: SkinType = 'ios';

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

    /**
     * 允许点击背景关闭
     *
     * @type {boolean}
     * @default true
     */
    backdrop?: boolean = true;
}
