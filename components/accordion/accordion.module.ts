import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
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
