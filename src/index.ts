import { NgModule, ModuleWithProviders } from '@angular/core';
import { ButtonModule } from "./button/button.module";
import { FormModule } from "./form/form.module";

export { ButtonDirective, ButtonConfig, ButtonModule } from './button';
export { InputDirective, VCodeDirective, TextareaDirective, 
         FormModule } from './form';

const MODULES = [
    ButtonModule, FormModule
];

@NgModule({
    imports: [
        ButtonModule.forRoot(), 
        FormModule.forRoot()
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
