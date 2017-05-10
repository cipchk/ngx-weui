import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PTRConfig, PTRComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ PTRComponent ],
    exports: [ PTRComponent ],
    entryComponents: [ PTRComponent ]
})
export class PTRModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: PTRModule, providers: [ PTRConfig ] };
    }
}
