import { Directive, HostListener } from '@angular/core';
import { SidebarService } from './sidebar.service';

/**
 * 关闭侧边栏指令
 */
@Directive({ selector: '[closeSidebar]' })
export class CloseSidebarDirective {
  constructor(private _sidebarService: SidebarService) {}

  @HostListener('click')
  _onClick(): void {
    this._sidebarService.close();
  }
}
