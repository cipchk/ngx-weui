import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetService, ActionSheetConfig, ActionSheetComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ActionSheetComponent ],
    exports: [ ActionSheetComponent ],
    providers: [ ActionSheetService ],
    entryComponents: [ ActionSheetComponent ]
})
export class ActionSheetModule {
    public static forRoot(config?: ActionSheetConfig): ModuleWithProviders {
        return {
            ngModule: ActionSheetModule,
            providers: [
                { provide: ActionSheetConfig, useValue: config || new ActionSheetConfig() }
            ]
        };
    }
}
