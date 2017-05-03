import { Observable } from 'rxjs/Rx';
import { PickerData } from './data';

export interface PickerOptions {
    /**
     * 类型
     * default：无任何显示
     * form：会以表单的形式出现
     * @see https://cipchk.github.io/ngx-weui/#/example/picker
     * @type {('default' | 'form')}
     */
    type?: 'default' | 'form';

    /**
     * 当使用异常加载数据时，必须指定
     * 
     * @type {number}
     */
    gruopCount?: number;

    /**
     * 异常数据源
     * 
     * @param {number} groupIndex
     * @param {PickerData[]} values 
     * @returns {Observable<PickerData[]>} 
     */
    data?(groupIndex: number, values: PickerData[]): Observable<any>;

    /**
     * 取消按钮文本
     * 
     * @type {string}
     * @default 取消
     */
    cancel?: string;

    /**
     * 确定按钮文本
     * 
     * @type {string}
     * @default 确定
     */
    confirm?: string;

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default true
     */
    backdrop?: boolean;
}
