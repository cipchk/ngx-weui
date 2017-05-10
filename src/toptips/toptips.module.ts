import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToptipsService, ToptipsComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ToptipsComponent ],
    exports: [ ToptipsComponent ],
    providers: [ ToptipsService ],
    entryComponents: [ ToptipsComponent ]
})
export class ToptipsModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: ToptipsModule, providers: [  ] };
    }
}
