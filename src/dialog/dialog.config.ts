import { Injectable } from '@angular/core';
import { SkinType, ButtonType, InputType, InputData } from "../utils/types";

@Injectable()
export class DialogConfig {

    /**
     * 对话框类型
     * default：默认文本或HTML格式
     * prompt：可输入对话框
     *
     * @type {('default' | 'prompt')}
     * @default 'default'
     */
    type?: 'default' | 'prompt' = 'default';

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
     * Input `type` 字段
     *
     * @type {InputType}
     */
    input?: InputType;
    /**
     * Input `placeholder` 字段
     *
     * @type {string}
     */
    inputPlaceholder?: string;
    /**
     * Input 初始化值
     *
     * @type {any}
     */
    inputValue?: any;
    /**
     * Input `required` 字段，必填项校验失败时【确定】按钮为 `disabled` 状态。
     *
     * @type {boolean}
     * @default true
     */
    inputRequired?: boolean;
    /**
     * Input 正则判断校验。
     * 如无指定，会根据 `input` 类型分别对：`email`、`url` 默认提供正则表达式
     *
     * @type {RegExp}
     */
    inputRegex?: RegExp;
    /**
     * 输入参数无效时提醒文本。
     *
     * @type {string}
     */
    inputError?: string;

    /**
     * 数据数组，如果input值为 `select` `radio` `checkbox` 时为必填项。
     *
     * @type {InputData[]}
     */
    inputOptions?: InputData[];

    /**
     * HTML元素属性对象，例如 `min` `max` 等，对象键表示属性名，对象值表示属性值
     *
     * @type {*}
     */
    inputAttributes?: any;

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
