import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { StepperComponent } from "./index";

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [
        StepperComponent
    ],
    exports: [
        StepperComponent
    ]
})
export class StepperModule {
    public static forRoot(): ModuleWithProviders {
        return { ngModule: StepperModule, providers: [] };
    }
}
