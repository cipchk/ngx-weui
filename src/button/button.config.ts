import { Injectable } from '@angular/core';
import { ButtonType } from '../utils/types'

/**
 * 按钮全局配置项 {@link https://github.com/cipchk/ngx-weui/blob/master/docs/config.md|使用方式}
 */
@Injectable()
export class ButtonConfig {

    /**
     * 操作场景：primary、default、warn
     * 
     * @type {ButtonType}
     * @default primary
     */
    type: ButtonType = 'primary';

    /**
     * disabled状态
     * 
     * @type {boolean}
     * @default false
     */
    disabled: boolean = false;

    /**
     * 是否加载状态
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
     * 是否小号
     * 
     * @type {boolean}
     * @default false
     */
    mini: boolean = false;
}
