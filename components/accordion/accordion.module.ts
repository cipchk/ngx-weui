import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionComponent, AccordionPanelComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionPanelComponent, AccordionComponent],
  exports: [AccordionPanelComponent, AccordionComponent],
})
export class AccordionModule {}
