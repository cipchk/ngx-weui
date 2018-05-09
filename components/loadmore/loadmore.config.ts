import { Injectable } from '@angular/core';

@Injectable()
export class LoadmoreConfig {
  /**
   * 类型，默认：`loading`
   */
  type?: 'loading' | 'line' | 'dot' = 'loading';

  /**
   * 当type=='loading'时显示的文本，默认：`正在加载`
   */
  loadingText?: string = '正在加载';

  /**
   * 当type=='line'时显示的文本，默认：`暂无数据`
   */
  lineText?: string = '暂无数据';
}
