import { Injectable } from '@angular/core';
import { AnimateType } from '../utils/types';

@Injectable()
export class AccordionConfig {
    /**
     * 是否可折叠，`false` 表示保持只有一个可折叠，`true` 表示所有都允许
     *
     * @type {boolean}
     * @default false
     */
    collapsible: boolean = false;
    /**
     * 自动展开第一次
     *
     * @type {boolean}
     * @default true
     */
    activeFirst: boolean = true;
    /**
     * 动画类型，`none` 无动画，`slide` 滑动
     *
     * @type {AnimateType}
     */
    animate: AnimateType = 'slide';
}
