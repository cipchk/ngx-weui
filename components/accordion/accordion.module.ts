import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionPanelComponent } from './accordion-panel.component';
import { AccordionComponent } from './accordion.component';
import { AccordionConfig } from './accordion.config';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionPanelComponent, AccordionComponent],
  exports: [AccordionPanelComponent, AccordionComponent],
})
export class AccordionModule {
  public static forRoot(): ModuleWithProviders {
    return { ngModule: AccordionModule, providers: [AccordionConfig] };
  }
}
