import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SidebarContainerComponent } from './sidebar-container.component';
import { SidebarComponent } from './sidebar.component';
import { CloseSidebarDirective } from './close.directive';
import { SidebarService } from './sidebar.service';
import { SidebarConfig } from './sidebar.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SidebarContainerComponent,
    SidebarComponent,
    CloseSidebarDirective,
  ],
  exports: [SidebarContainerComponent, SidebarComponent, CloseSidebarDirective],
  providers: [SidebarService],
})
export class SidebarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SidebarModule, providers: [SidebarConfig] };
  }
}
