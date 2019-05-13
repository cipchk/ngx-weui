import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { LoadmoreConfig } from './loadmore.config';

@Component({
  selector: 'weui-loadmore',
  exportAs: 'weuiLoadmore',
  templateUrl: './loadmore.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoadmoreComponent {
  /**
   * 类型，默认：`loading`
   */
  @Input() type: 'loading' | 'line' | 'dot' = 'loading';

  /**
   * 当 `type==='loading'` 时显示的文本，默认：`正在加载`
   */
  @Input() loadingText: string = '正在加载';

  /**
   * 当 `type==='line'` 时显示的文本，默认：`暂无数据`
   */
  @Input() lineText: string = '暂无数据';

  constructor(DEF: LoadmoreConfig) {
    Object.assign(this, DEF);
  }
}
