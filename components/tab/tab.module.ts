import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TabDirective } from './tab.directive';
import { NavbarComponent } from './navbar.component';
import { TabbarComponent } from './tabbar.component';
import { BarComponent } from './bar.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TabDirective, NavbarComponent, TabbarComponent, BarComponent],
  exports: [TabDirective, NavbarComponent, TabbarComponent],
})
export class TabModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: TabModule, providers: [] };
  }
}
