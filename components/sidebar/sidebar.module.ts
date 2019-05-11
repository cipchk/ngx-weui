import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CloseSidebarDirective } from './close.directive';
import { SidebarContainerComponent } from './sidebar-container.component';
import { SidebarComponent } from './sidebar.component';
import { SidebarService } from './sidebar.service';

const COMPONENTS = [SidebarContainerComponent, SidebarComponent, CloseSidebarDirective];

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [SidebarService],
})
export class SidebarModule {}
