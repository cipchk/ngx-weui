import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ChartG2Directive } from './chart-g2.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ChartG2Directive],
  exports: [ChartG2Directive],
})
export class ChartG2Module {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ChartG2Module, providers: [] };
  }
}
