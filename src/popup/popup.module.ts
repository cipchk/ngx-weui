import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupConfig, PopupComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ PopupComponent ],
    exports: [ PopupComponent ],
    entryComponents: [ PopupComponent ]
})
export class PopupModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: PopupModule, providers: [ PopupConfig ] };
    }
}
