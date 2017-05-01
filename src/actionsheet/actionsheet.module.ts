import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetService, ActionSheetConfig, ActionSheetComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ActionSheetComponent ],
    exports: [ ActionSheetComponent ],
    entryComponents: [ ActionSheetComponent ]
})
export class ActionSheetModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: ActionSheetModule, providers: [ ActionSheetConfig ] };
    }
}
