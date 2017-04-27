import { Injectable } from '@angular/core';

@Injectable()
export class ButtonConfig {
    /**
     * 置灰态
     * 
     * @type {boolean}
     * @default false
     */
    disabled: boolean = false;

    /**
     * 加载状态
     * 
     * @type {boolean}
     * @default false
     */
    loading: boolean = false;

    /**
     * 镂空按钮
     * 
     * @type {boolean}
     * @default false
     */
    plain: boolean = false;

    /**
     * 操作场景：确定、取消、警示
     * 
     * @type {('default' | 'primary' | 'warn')}
     * @default primary
     */
    type: 'default' | 'primary' | 'warn' = 'primary';

    /**
     * 是否小号
     * 
     * @type {boolean}
     * @default false
     */
    mini: boolean = false;
}
