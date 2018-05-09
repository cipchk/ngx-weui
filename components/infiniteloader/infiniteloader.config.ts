import { Injectable } from '@angular/core';

@Injectable()
export class InfiniteLoaderConfig {
  /**
   * 容器高度，默认：`100vh`
   */
  height?: string = '100vh';

  /**
   * 滚动至x%时触发加载，默认：75%
   */
  percent?: number = 75;

  /**
   * 加载中文本（支持HTML），默认：weui-loadmore 组件
   */
  loading?: string = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中…</span></div>';

  /**
   * 完成所有数据加载文本（支持HTML），默认：weui-loadmore 组件
   */
  finished?: string = '<div class="weui-loadmore weui-loadmore_line"><span class="weui-loadmore__tips">已加载完毕</span></div>';

  /**滚动节流时长（单位：ms），默认：`100` */
  throttle?: number = 100;
}
