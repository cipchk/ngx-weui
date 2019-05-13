import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartG2Directive } from './chart-g2.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ChartG2Directive],
  exports: [ChartG2Directive],
})
export class ChartG2Module {}
