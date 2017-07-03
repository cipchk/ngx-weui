import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionPanelComponent, AccordionComponent, AccordionConfig } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ AccordionPanelComponent, AccordionComponent ],
    exports: [ AccordionPanelComponent, AccordionComponent ],
    providers: [  ]
})
export class AccordionModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: AccordionModule, providers: [ AccordionConfig ] };
    }
}
