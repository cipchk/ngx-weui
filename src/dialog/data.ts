import { ButtonType, SkinType } from '../utils/types'

export interface DialogData {
    /**
     * 样式
     * 
     * @type {SkinType}
     * @default ios
     */
    skin?: SkinType;

    /**
     * 标题
     * 
     * @type {string}
     */
    title?: string;

    /**
     * 内容
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
    cancel?: string;

    /**
     * 取消按钮类型
     * 
     * @type {ButtonType}
     * @default default
     */
    cancelType?: ButtonType;

    /**
     * 确认，返回true
     * 
     * @type {string}
     */
    confirm?: string;

    /**
     * 确认按钮类型
     * 
     * @type {ButtonType}
     * @default primary
     */
    confirmType?: ButtonType;

    /**
     * 自定义按钮组，当此属性存在时 `cancel` & `confirm` 参数将失效
     */
    btns?: { text: string, type: ButtonType, value: boolean | any, [key: string]: any }[];

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default false
     */
    backdrop?: boolean;
}
