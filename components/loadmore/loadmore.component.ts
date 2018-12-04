import {
  Component,
  HostListener,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LoadmoreConfig } from './loadmore.config';

@Component({
  selector: 'weui-loadmore',
  template: `
    <div class="weui-loadmore" [ngClass]="{
      'weui-loadmore_line': type!=='loading',
      'weui-loadmore_dot': type==='dot'
    }">
      <i class="weui-loading" *ngIf="type==='loading'"></i>
      <span class="weui-loadmore__tips">{{type==='dot'?'':type==='line'?lineText:loadingText}}</span>
    </div>
  `,
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
