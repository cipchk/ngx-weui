import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CloseSidebarDirective } from './close.directive';
import { SidebarContainerComponent } from './sidebar-container.component';
import { SidebarComponent } from './sidebar.component';
import { SidebarConfig } from './sidebar.config';
import { SidebarService } from './sidebar.service';

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarContainerComponent, SidebarComponent, CloseSidebarDirective],
  exports: [SidebarContainerComponent, SidebarComponent, CloseSidebarDirective],
  providers: [SidebarService],
})
export class SidebarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SidebarModule, providers: [SidebarConfig] };
  }
}
