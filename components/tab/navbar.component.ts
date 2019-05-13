import { forwardRef, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BarComponent } from './bar.component';

/**
 * 顶部选项卡
 */
@Component({
  selector: 'weui-navbar',
  exportAs: 'weuiNavbar',
  templateUrl: './navbar.component.html',
  providers: [{ provide: BarComponent, useExisting: forwardRef(() => NavbarComponent) }],
  host: {
    '[class.weui-tab]': 'true',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent extends BarComponent {}
