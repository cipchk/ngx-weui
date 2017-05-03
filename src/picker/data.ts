export interface PickerData {
    [key: string]: any;

    /**
     * 显示文本
     * 
     * @type {string}
     */
    label: string;

    /**
     * 值
     * 
     * @type {string}
     */
    value: string;

    /**
     * 是否禁用
     * 
     * @type {boolean}
     */
    disabled?: boolean;
}
