import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SliderDirective } from './slider';

@NgModule({
  imports: [CommonModule],
  declarations: [SliderDirective],
  exports: [SliderDirective],
})
export class SliderModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SliderModule, providers: [] };
  }
}
