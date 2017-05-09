import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastService, ToastConfig, ToastComponent } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ToastComponent ],
    exports: [ ToastComponent ],
    providers: [ ToastService ],
    entryComponents: [ ToastComponent ]
})
export class ToastModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: ToastModule, providers: [ ToastConfig ] };
    }
}
