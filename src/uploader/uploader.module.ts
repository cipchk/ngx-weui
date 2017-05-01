import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { UploaderFileDirective, FileThumbDirective, UploaderConfig } from "./index";

@NgModule({
    imports: [ CommonModule ],
    declarations: [
        UploaderFileDirective, FileThumbDirective
    ],
    exports: [
        UploaderFileDirective, FileThumbDirective
    ]
})
export class UploaderModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: UploaderModule, providers: [ UploaderConfig ] };
    }
}
