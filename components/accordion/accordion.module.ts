import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionPanelComponent, AccordionComponent],
  exports: [AccordionPanelComponent, AccordionComponent],
})
export class AccordionModule {}
