import { SkinType } from "../utils/types";

export interface ActionSheetData {
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
     * 取消
     * 
     * @type {string}
     * @default 取消
     */
    cancel?: string;

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default true
     */
    backdrop?: boolean;

    /**
     * 菜单列表
     * 
     * @type {{ text?: string, [key: string]: any }}
     */
    menu: { text?: string, [key: string]: any };
}
