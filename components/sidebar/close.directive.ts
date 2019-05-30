import { Directive } from '@angular/core';
import { SidebarService } from './sidebar.service';

/**
 * 关闭侧边栏指令
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[closeSidebar]',
  exportAs: 'weuiCloseSidebar',
  host: {
    '(click)': '_onClick()',
  },
})
export class CloseSidebarDirective {
  constructor(private _sidebarService: SidebarService) {}

  _onClick(): void {
    this._sidebarService.close();
  }
}
