import { Injectable } from '@angular/core';
import { ButtonType } from '../utils/types';

@Injectable()
export class ButtonConfig {

    /**
     * 操作场景：primary、default、warn
     *
     * @type {ButtonType}
     */
    type: ButtonType = 'primary';

    /**
     * disabled状态
     *
     * @type {boolean}
     */
    disabled: boolean = false;

    /**
     * 是否加载状态
     *
     * @type {boolean}
     */
    loading: boolean = false;

    /**
     * 镂空按钮
     *
     * @type {boolean}
     */
    plain: boolean = false;

    /**
     * 是否小号
     *
     * @type {boolean}
     */
    mini: boolean = false;
}
