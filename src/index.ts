import { NgModule, ModuleWithProviders } from '@angular/core';

import { CellModule } from "./cell/cell.module";
import { ButtonModule } from "./button/button.module";
import { FormModule } from "./form/form.module";
import { SliderModule } from "./slider/slider.module";
import { UploaderModule } from "./uploader/uploader.module";
import { ActionSheetModule } from "./actionsheet/actionsheet.module";

export { SwipeDirective, CellModule } from './cell';
export { ButtonDirective, ButtonConfig, ButtonModule } from './button';
export { InputDirective, VCodeDirective, TextareaDirective, 
         FormModule } from './form';
export { SliderDirective, SliderModule } from './slider';
export * from './uploader';
export * from './actionsheet';

const MODULES = [
    CellModule, ButtonModule, FormModule, SliderModule, UploaderModule, ActionSheetModule
];

@NgModule({
    imports: [
        CellModule.forRoot(), ButtonModule.forRoot(),  FormModule.forRoot(), 
        SliderModule.forRoot(), UploaderModule.forRoot(), ActionSheetModule.forRoot()
    ],
    exports: MODULES
})
export class WeUiRootModule {
}

@NgModule({ exports: MODULES })
export class WeUiModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: WeUiRootModule };
    }
}
