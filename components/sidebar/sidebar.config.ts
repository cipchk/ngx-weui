import { Injectable } from '@angular/core';

export type PositionType = 'left' | 'right' | 'top' | 'bottom';

export type ModeType = 'over' | 'slide';

@Injectable()
export class SidebarConfig {
  /**
   * 位置方向，默认：`left`
   */
  position: PositionType = 'left';

  /**
   * 类型，默认：`slide`
   * - over: 不覆盖
   * - slide：侧边移动
   */
  mode: ModeType = 'slide';

  /**
   * 允许点击背景关闭，默认：`true`
   */
  backdrop: boolean = true;
}
