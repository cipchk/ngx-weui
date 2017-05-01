import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { LoadmoreComponent, LoadmoreConfig } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ LoadmoreComponent ],
    exports: [ LoadmoreComponent ],
    entryComponents: [ LoadmoreComponent ]
})
export class LoadmoreModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: LoadmoreModule, providers: [ LoadmoreConfig ] };
    }
}
