import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService, DialogConfig, DialogComponent } from "./index";
import { MaskModule } from './../mask/mask.module';

@NgModule({
    imports: [ CommonModule, MaskModule ],
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
