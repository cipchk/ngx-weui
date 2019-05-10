import { forwardRef, Component } from '@angular/core';
import { BarComponent } from './bar.component';

/**
 * 底部选项卡
 */
@Component({
  selector: 'weui-tabbar',
  templateUrl: './tabbar.component.html',
  providers: [{ provide: BarComponent, useExisting: forwardRef(() => TabbarComponent) }],
  host: {
    '[class.weui-tab]': 'true',
  },
})
export class TabbarComponent extends BarComponent {}
