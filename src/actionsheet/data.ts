import { ActionSheetConfig } from './actionsheet.config';

export interface ActionSheetData {
    /**
     * 样式
     * 
     * @type {('ios' | 'android')}
     * @default ios
     */
    skin?: 'ios' | 'android';

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
     * 菜单列表
     * 
     * @type {{ text?: string, [key: string]: any }}
     */
    menu: { text?: string, [key: string]: any };
}
