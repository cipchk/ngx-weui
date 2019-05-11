import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BarComponent } from './bar.component';
import { NavbarComponent } from './navbar.component';
import { TabDirective } from './tab.directive';
import { TabbarComponent } from './tabbar.component';

const COMPONENTS = [TabDirective, NavbarComponent, TabbarComponent, BarComponent];

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class TabModule {}
