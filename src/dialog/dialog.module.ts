import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService, DialogConfig, DialogComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ DialogComponent ],
    exports: [ DialogComponent ],
    providers: [ DialogService ],
    entryComponents: [ DialogComponent ]
})
export class DialogModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: DialogModule, providers: [ DialogConfig ] };
    }
}
