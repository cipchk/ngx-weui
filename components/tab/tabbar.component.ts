import { forwardRef, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BarComponent } from './bar.component';

/**
 * 底部选项卡
 */
@Component({
  selector: 'weui-tabbar',
  exportAs: 'weuiTabbar',
  templateUrl: './tabbar.component.html',
  providers: [{ provide: BarComponent, useExisting: forwardRef(() => TabbarComponent) }],
  host: {
    '[class.weui-tab]': 'true',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabbarComponent extends BarComponent {}
