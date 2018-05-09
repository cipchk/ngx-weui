import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SwipeDirective } from './swipe.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SwipeDirective],
  exports: [SwipeDirective],
})
export class CellModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: CellModule, providers: [] };
  }
}
