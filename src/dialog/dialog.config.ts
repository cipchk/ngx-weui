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
     * 标题
     *
     * @type {string}
     */
    title?: string;

    /**
     * 内容（支持HTML）
     *
     * @type {string}
     */
    content?: string;

    /**
     * 取消，返回false
     *
     * @type {string}
     * @default 取消
     */
    cancel?: string = '取消';

    /**
     * 取消按钮类型
     *
     * @type {ButtonType}
     * @default default
     */
    cancelType?: ButtonType = 'default';

    /**
     * 确认，返回true
     *
     * @type {string}
     */
    confirm?: string = '确认';

    /**
     * 确认按钮类型
     *
     * @type {ButtonType}
     * @default primary
     */
    confirmType?: ButtonType = 'primary';

    /**
     * 自定义按钮组，当此属性存在时 `cancel` & `confirm` 参数将失效
     * @type {Array}
     */
    btns?: { text: string, type: ButtonType, value: boolean | any, [key: string]: any }[];

    /**
     * 允许点击背景关闭
     *
     * @type {boolean}
     * @default false
     */
    backdrop?: boolean = false;
}
