import { Injectable } from '@angular/core';
import { PaginationMode } from './pagination.type';

@Injectable()
export class PaginationConfig {
    /**
     * 形态，可选 `button`,`pointer`
     * @default button
     */
    mode: PaginationMode = 'button';
    /**
     * 是否隐藏数值
     * @default false
     */
    simple: boolean = false;

    /**
     * 小号按钮
     * @default true
     */
    mini: boolean = true;

    /**
     * 上一页文本（支持HTML）
     * @default '上一页'
     */
    prevText: string = '上一页';
    /**
     * 下一页文本（支持HTML）
     * @default '下一步'
     */
    nextText: string = '下一步';
}
