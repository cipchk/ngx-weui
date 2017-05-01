import { Injectable } from '@angular/core';
import { SkinType, ButtonType } from "../utils/types";

@Injectable()
export class DialogConfig {
    /**
     * 样式
     * 
     * @type {SkinType}
     */
    skin?: SkinType = 'auto';

    /**
     * 取消按钮类型
     * 
     * @type {ButtonType}
     * @default default
     */
    cancelType?: ButtonType = 'default';

    /**
     * 确认按钮类型
     * 
     * @type {ButtonType}
     * @default primary
     */
    confirmType?: ButtonType = 'primary';

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default false
     */
    backdrop?: boolean = false;
}
