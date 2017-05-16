import { Injectable } from '@angular/core';

export type PositionType = 'left' | 'right' | 'top' | 'bottom';

export type ModeType = 'over' | 'slide';

@Injectable()
export class SidebarConfig {
    /**
     * 位置方向
     * 
     * @type {PositionType}
     * @default left
     */
    position: PositionType = 'left';

    /**
     * 类型
     * over: 不覆盖
     * slide：侧边移动
     * 
     * @type {ModeType}
     * @default slide
     */
    mode: ModeType = 'slide';

    /**
     * 允许点击背景关闭
     * 
     * @type {boolean}
     * @default true
     */
    backdrop: boolean = true;
}
